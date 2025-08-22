import { NextFunction, Request, Response, Router } from "express";
import GTSGameAttempt from "../models/GTSGameAttemptModel";
import { WebSocketServer } from "ws";

var net = require("net");
var server = net.createServer();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on("connection", (ws) => {
      console.log("Новый клиент подключился!");

      ws.on("message", (message) => {
        console.log(`Получено сообщение: ${message}`);
        ws.send("Сообщение получено!");
      });

      ws.on("close", () => {
        console.log("Клиент отключился");
      });
    });
    res.send("server ready");
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
  console.log("Сервер запущен на 8080 порту");
});

export default router;
