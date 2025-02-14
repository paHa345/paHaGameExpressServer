import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "../libs/MongoConnect";
import GTSGameAttempt from "../models/GTSGameAttemptModel";
import { Readable } from "stream";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
console.log("start");
app.get("/GTSAttempts", async (req: Request, res: Response) => {
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

    const sendData = () => {
      const data = new Date();
      console.log(data);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    const intervalID = setInterval(sendData, 1000);

    req.on("close", () => {
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
