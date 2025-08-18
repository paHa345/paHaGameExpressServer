import { NextFunction, Request, Response, Router } from "express";
import GTSGameAttempt from "../models/GTSGameAttemptModel";

const router = Router();

router.get("/:attemptID", async (req: Request, res: Response) => {
  try {
    const currentGTSGameAttemptTime = await GTSGameAttempt.findById(req.params.attemptID).select(
      "timeRemained"
    );
    if (currentGTSGameAttemptTime === null) {
      throw new Error(`Не найдена попытка: ${req.params.attemptID}`);
    }
    const headers = {
      // Тип соединения 'text/event-stream' необходим для SSE
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
      // Отставляем соединение открытым 'keep-alive'
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);

    console.log(req.params.attemptID);

    const sendData = async () => {
      const currentGTSGameAttemptTime = await GTSGameAttempt.findById(req.params.attemptID).select(
        "timeRemained"
      );

      const currentTime = JSON.parse(JSON.stringify(currentGTSGameAttemptTime.timeRemained));

      if (currentTime <= 0) {
        res.write(`AttemptTimeIsUp: ${true}\n\n`);
        console.log("Attempt time is up");

        clearInterval(intervalID);
        res.end();
        return;
      }

      const updatedGTSGameAttempt = await GTSGameAttempt.findByIdAndUpdate(
        req.params.attemptID,
        {
          $set: { timeRemained: currentTime - 1 },
        },
        {
          new: true,
        }
      );
      res.write(`attemptTimeRemained: ${JSON.stringify(updatedGTSGameAttempt.timeRemained)}\n\n`);
    };
    const intervalID = setInterval(sendData, 1000);

    req.on("close", () => {
      res.write(`stopAttempt: ${true}\n\n`);
      console.log("client disconnected");
      clearInterval(intervalID); // очистка интервала отправки данных
      res.end();
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default router;
