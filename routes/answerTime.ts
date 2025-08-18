import { NextFunction, Request, Response, Router } from "express";
import GTSGameAttempt from "../models/GTSGameAttemptModel";

const router = Router();

router.get("/:attemptID", async (req: Request, res: Response) => {
  try {
    const currentGTSGameAttemptTime = await GTSGameAttempt.findById(req.params.attemptID).select(
      "answerTime"
    );

    if (currentGTSGameAttemptTime === null) {
      throw new Error(`Не найдена попытка: ${req.params.attemptID}`);
    }

    const headers = {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);

    const decrementAnswerTime = async () => {
      const currentGTSGameAttemptTime = await GTSGameAttempt.findById(req.params.attemptID).select(
        "answerTime"
      );
      const currentAnswerTime = JSON.parse(JSON.stringify(currentGTSGameAttemptTime.answerTime));

      if (currentAnswerTime <= 0) {
        const updatedGTSGameAttempt = await GTSGameAttempt.findByIdAndUpdate(
          req.params.attemptID,
          {
            $set: { answerTime: 0 },
          },
          {
            new: true,
          }
        );
        res.write(`timesUp: ${true}\n\n`);
        console.log("timesUp");

        clearInterval(intervalID);
        res.end();
        return;
      }
      const updatedGTSGameAttempt = await GTSGameAttempt.findByIdAndUpdate(
        req.params.attemptID,
        {
          $set: { answerTime: currentAnswerTime - 1 },
        },
        {
          new: true,
        }
      );

      res.write(`answerTimeRemained: ${JSON.stringify(updatedGTSGameAttempt.answerTime)}\n\n`);
    };

    const intervalID = setInterval(decrementAnswerTime, 1000);

    req.on("close", () => {
      res.write(`stopAttempt: ${true}\n\n`);
      console.log("client disconnected");
      clearInterval(intervalID); // очистка интервала отправки данных
      res.end();
    });
  } catch (error: any) {
    // console.log(error);
    res.status(500).send(error.message);
  }
});

export default router;
