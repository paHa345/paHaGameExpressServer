// import express, { Express, NextFunction, Request, Response } from "express";

// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io"); // Add this

// app.use(cors()); // Add cors middleware

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
// app.get("/", async (req: Request, res: Response) => {
//   res.send("alsd,ald");
// });

// io.on("connection", (socket: any) => {
//   console.log(`User connected ${socket.id}`);

// });

// server.listen(3111, () => "Server is running on port 3000");

import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "../libs/MongoConnect";
import GTSGameAttempt from "../models/GTSGameAttemptModel";
import userRoutes from "./../routes/users";
import uploadFile from "../routes/uploadFile";
import answerTime from "../routes/answerTime";
import GTSAttempts from "../routes/GTSAttempts";
import webSocketServer from "../routes/webSocketServer";
import { WebSocketServer } from "ws";
// const cors = require("cors");
const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
import http from "http";

import cors from "cors";

import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
console.log("start");

const server = http.createServer(app);

app.use(cors());

const corsOptions = {
  origin: "https://s3.timeweb.com",
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOptions));
// app.get("/GTSAttempts/:attemptID", async (req: Request, res: Response) => {
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User connected ${socket.id}`);

  socket.on("send-message", (message: any) => {
    console.log(`Message: ${message} from user ${socket.id}`);
    // socket.to(roomID).emit("receive-message", message);
  });
});

//   try {
//     const headers = {
//       // Тип соединения 'text/event-stream' необходим для SSE
//       "Content-Type": "text/event-stream",
//       "Access-Control-Allow-Origin": "*",
//       // Отставляем соединение открытым 'keep-alive'
//       Connection: "keep-alive",
//       "Cache-Control": "no-cache",
//     };
//     res.writeHead(200, headers);

//     console.log(req.params.attemptID);

//     const sendData = async () => {
//       const currentGTSGameAttemptTime = await GTSGameAttempt.findById(req.params.attemptID).select(
//         "timeRemained"
//       );

//       const currentTime = JSON.parse(JSON.stringify(currentGTSGameAttemptTime.timeRemained));

//       if (currentTime <= 0) {
//         res.write(`AttemptTimeIsUp: ${true}\n\n`);
//         console.log("Attempt time is up");

//         clearInterval(intervalID);
//         res.end();
//         return;
//       }

//       const updatedGTSGameAttempt = await GTSGameAttempt.findByIdAndUpdate(
//         req.params.attemptID,
//         {
//           $set: { timeRemained: currentTime - 1 },
//         },
//         {
//           new: true,
//         }
//       );
//       res.write(`attemptTimeRemained: ${JSON.stringify(updatedGTSGameAttempt.timeRemained)}\n\n`);
//     };
//     const intervalID = setInterval(sendData, 1000);

//     req.on("close", () => {
//       res.write(`stopAttempt: ${true}\n\n`);
//       console.log("client disconnected");
//       clearInterval(intervalID); // очистка интервала отправки данных
//       res.end();
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// });

// app.get("/answerTime/:attemptID", async (req: Request, res: Response) => {
//   try {
//     const headers = {
//       "Content-Type": "text/event-stream",
//       "Access-Control-Allow-Origin": "*",
//       Connection: "keep-alive",
//       "Cache-Control": "no-cache",
//     };
//     res.writeHead(200, headers);

//     const decrementAnswerTime = async () => {
//       const currentGTSGameAttemptTime = await GTSGameAttempt.findById(req.params.attemptID).select(
//         "answerTime"
//       );

//       const currentAnswerTime = JSON.parse(JSON.stringify(currentGTSGameAttemptTime.answerTime));

//       if (currentAnswerTime <= 0) {
//         const updatedGTSGameAttempt = await GTSGameAttempt.findByIdAndUpdate(
//           req.params.attemptID,
//           {
//             $set: { answerTime: 0 },
//           },
//           {
//             new: true,
//           }
//         );
//         res.write(`timesUp: ${true}\n\n`);
//         console.log("timesUp");

//         clearInterval(intervalID);
//         res.end();
//         return;
//       }
//       const updatedGTSGameAttempt = await GTSGameAttempt.findByIdAndUpdate(
//         req.params.attemptID,
//         {
//           $set: { answerTime: currentAnswerTime - 1 },
//         },
//         {
//           new: true,
//         }
//       );

//       res.write(`answerTimeRemained: ${JSON.stringify(updatedGTSGameAttempt.answerTime)}\n\n`);
//     };

//     const intervalID = setInterval(decrementAnswerTime, 1000);

//     req.on("close", () => {
//       res.write(`stopAttempt: ${true}\n\n`);
//       console.log("client disconnected");
//       clearInterval(intervalID); // очистка интервала отправки данных
//       res.end();
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// });

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // console.log(`Request URL: ${req.url}`);
  next(); // Pass control to the next handler
};
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // console.log("Authentication middleware");
  next(); // Proceed to the next middleware
};

const authorize = (req: Request, res: Response, next: NextFunction) => {
  // console.log("Authorization middleware");
  next(); // Proceed to the route handler
};

app.use(logMiddleware); // Apply middleware globally

app.use("/", async (req: Request, res: Response, next) => {
  // const wss = new WebSocketServer({ port: 8080 });

  // wss.on("connection", (ws) => {
  //   console.log("Новый клиент подключился!");

  //   ws.on("message", (message) => {
  //     console.log(`Получено сообщение: ${message}`);
  //     ws.send("Сообщение получено!");
  //   });

  //   ws.on("close", () => {
  //     console.log("Клиент отключился");
  //   });
  // });

  // console.log("Middleware function");

  // const now = new Date();
  // const hour = now.getHours();
  // const minutes = now.getMinutes();
  // const seconds = now.getSeconds();
  // const data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get("user-agent")}`;
  // console.log(data);
  next();
});
app.get("/", authenticate, authorize, async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  // const wss = new WebSocketServer({ port: 4000 });

  // wss.on("connection", (ws) => {
  //   console.log("Новый клиент подключился!");

  //   ws.on("message", (message) => {
  //     console.log(`Получено сообщение: ${message}`);
  //     ws.send("Сообщение получено!");
  //   });

  //   ws.on("close", () => {
  //     console.log("Клиент отключился");
  //   });
  // });
  // console.log("Socket created");
});

app.use("/users", userRoutes);

app.use("/GTSAttempts", GTSAttempts);

app.use("/answerTime", answerTime);

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
// import fs from "fs";

// app.get("/uploadFile", async (req: Request, res: Response) => {
//   const CREDENTIAL = {
//     accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID as string,
//     secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY as string,
//   };
//   const s3Client = new S3Client({
//     region: "ru-1",
//     credentials: CREDENTIAL,
//     endpoint: "https://s3.timeweb.cloud",
//     forcePathStyle: true,
//     apiVersion: "latest",
//   });

//   const bucketParams = { Bucket: "f1525e96-2c5a759f-3888-4bd2-a52f-dbb62685b4bb" };
//   const uploadParams = { Bucket: bucketParams.Bucket, Key: "", Body: "" };

//   console.log("Создание клиента");

//   const s3 = new S3({
//     accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID as string,
//     secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY as string,
//     endpoint: "https://s3.timeweb.cloud",
//     s3ForcePathStyle: true,
//     region: "ru-1",
//     apiVersion: "latest",
//   });

//   const runTest = async () => {
//     // try {
//     //   console.log("Список объектов в бакете");

//     //   const res = await s3.listObjects(bucketParams).promise();
//     //   console.log("Success", res);
//     // } catch (e) {
//     //   console.log("Error", e);
//     // }

//     try {
//       console.log("Регион бакета");

//       const res = await s3.getBucketLocation(bucketParams).promise();
//       console.log("Success", res);
//     } catch (e) {
//       console.log("Error", e);
//     }

//     try {
//       console.log("Загрузка файла в бакет");

//       const fs = require("fs");
//       const fileStream = fs.createReadStream("./src/channels4_profile.jpg");
//       fileStream.on("error", function (err: any) {
//         console.log("File Error", err);
//       });
//       uploadParams.Body = fileStream;
//       const path = require("path");
//       uploadParams.Key = path.basename("./channels4_profile.jpg");

//       const res = await s3.upload(uploadParams).promise();
//       console.log("Success", res);
//     } catch (e) {
//       console.log("Error", e);
//     }
//   };

//   runTest()
//     .then((_) => {
//       console.log("Done");
//     })
//     .catch((e) => {
//       console.log("Error", e);
//     });

//   // try {
//   //   const fileStream = fs.createReadStream("./src/channels4_profile.jpg");

//   //   console.log(s3Client);

//   //   const params = {
//   //     Bucket: "f1525e96-2c5a759f-3888-4bd2-a52f-dbb62685b4bb",
//   //     Key: "app.ts", // Путь в хранилище
//   //     Body: fileStream,
//   //     ContentType: "image/jpeg",
//   //   };

//   //   const command = new PutObjectCommand(params);

//   //   const response = await s3Client.send(command);

//   //   console.log("Файл загружен:", response);
//   // } catch (err) {
//   //   console.error("Ошибка:", err);
//   // }

//   res.send("UploadFile to timeWeb");
// });

app.use("/uploadFile", uploadFile);

app.use("/webSocketServer", webSocketServer);

server.listen(port, async () => {
  try {
    await connectMongoDB();

    console.log(`[server]: Server is running at http://localhost:${port} and connect to database`);
  } catch (error) {
    console.log(error);
  }
});
