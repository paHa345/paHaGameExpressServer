import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "../libs/MongoConnect";
import GTSGameAttempt from "../models/GTSGameAttemptModel";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
console.log("start");
app.get("/GTSAttempts/:attemptID", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.get("/answerTime/:attemptID", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  try {
    await connectMongoDB();

    console.log(`[server]: Server is running at http://localhost:${port} and connect to database`);
  } catch (error) {
    console.log(error);
  }
});
