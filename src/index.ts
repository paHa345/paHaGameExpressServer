import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "../libs/MongoConnect";
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

import { Server, Socket } from "socket.io";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

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
  connectionStateRecovery: {},
});

enum UserMoveDirections {
  right = "right",
  down = "down",
  up = "up",
  left = "left",
}

interface IGame {
  [socketID: string]: {
    square: {
      prevCoord: {
        x: number;
        y: number;
      };
      currentCoord: {
        x: number;
        y: number;
      };
    };
  };
}

const game: IGame = {};

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("send-message", (message: any) => {
    console.log(`Message: ${message} from user ${socket.id}`);
    io.emit("send-message", `Message: ${message} from user ${socket.id}`);
  });

  socket.on(
    "GTSGameRoomMessage",
    ({
      message,
      currentJoinedRoomID,
      telegramUser,
      type,
    }: {
      message: string;
      currentJoinedRoomID: string;
      telegramUser: {
        allows_write_to_pm: boolean | undefined;
        first_name: string | undefined;
        id: number | undefined;
        language_code: string | undefined;
        last_name: string | undefined;
        photo_url: string | undefined;
        username: string | undefined;
      };
      type: string;
    }) => {
      // console.log(io.of("/").adapter.rooms.get("68a82c599d9ad19c1b4ec4d2")?.size);
      io.to(currentJoinedRoomID).emit("roomGTSGameMessage", {
        message: message,
        telegramUserID: telegramUser.id,
        telegramUserName: telegramUser.username,
        messageDate: Date.now(),
        photo_url: telegramUser.photo_url,
        type,
      });
    }
  );

  interface IJoinRoomProps {
    roomID: string;
    telegramUser: {
      allows_write_to_pm: boolean | undefined;
      first_name: string | undefined;
      id: number | undefined;
      language_code: string | undefined;
      last_name: string | undefined;
      photo_url: string | undefined;
      username: string | undefined;
    };
    type: string;
  }

  socket.on("join_room", async ({ roomID, telegramUser, type }: IJoinRoomProps) => {
    socket.data.userdata = {
      username: telegramUser.username,
      userID: telegramUser.id,
      photoURL: telegramUser.photo_url,
      socketID: socket.id,
    };
    socket.join(roomID);
    socket.broadcast.to(roomID).emit("joinRoomUserMessage", {
      message: `Пользователь ${
        telegramUser.username ? telegramUser.username : telegramUser.id
      } подключился`,
      roomID: roomID,
      type,
    });

    const users = [];
    try {
      const roomUsers = await io.in(roomID).fetchSockets();
      for (const socket of roomUsers) {
        users.push(socket.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }

    io.of("/").to(roomID).emit("addUserInRoom", users);
  });
  socket.on("leave_room", async ({ roomID, telegramUser, type }: IJoinRoomProps) => {
    socket.leave(roomID);

    socket.broadcast.to(roomID).emit("leaveRoomUserMessage", {
      message: `Пользователь ${
        telegramUser.username ? telegramUser.username : telegramUser.id
      } отключился`,
      roomID: roomID,
      type,
    });
    const users = [];
    try {
      const roomUsers = await io.in(roomID).fetchSockets();
      for (const socket of roomUsers) {
        users.push(socket.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
    io.of("/").to(roomID).emit("deleteUserFromRoom", users);
  });

  socket.on("getSocketID", () => {
    io.to(socket.id).emit("socketID", socket.id);
  });

  socket.on("startGame", (roomID: string) => {
    console.log("start game");
    //проверяем есть ли данная комната в списке комнат, к которым подключен данный сокет
    if (!socket.rooms.has(roomID)) {
      return;
    }
    const numberOfGamers = Object.keys(game).length;
    game[socket.id] = {
      square: {
        prevCoord: {
          x: 10 + numberOfGamers * 20,
          y: 10,
        },
        currentCoord: {
          x: 10 + numberOfGamers * 20,
          y: 10,
        },
      },
    };
    console.log(Object.keys(game).length);
    io.of("/").to(roomID).emit("startGameInRoom", game);
  });

  let moveClientSquare: any;
  const setClientCoordinates = (clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  }) => {
    game[socket.id].square.prevCoord = JSON.parse(
      JSON.stringify(game[socket.id].square.currentCoord)
    );
    const setCurrentCoord = function (clientData: {
      direction: UserMoveDirections;
      roomID: string;
      shiftUserPixels: number;
    }) {
      if (clientData.direction === UserMoveDirections.down) {
        game[socket.id].square.currentCoord.y + clientData.shiftUserPixels > 280
          ? (game[socket.id].square.currentCoord.y = game[socket.id].square.currentCoord.y)
          : (game[socket.id].square.currentCoord.y =
              game[socket.id].square.currentCoord.y + clientData.shiftUserPixels);
      }
      if (clientData.direction === UserMoveDirections.left) {
        game[socket.id].square.currentCoord.x - clientData.shiftUserPixels < 0
          ? (game[socket.id].square.currentCoord.x = game[socket.id].square.currentCoord.x)
          : (game[socket.id].square.currentCoord.x =
              game[socket.id].square.currentCoord.x - clientData.shiftUserPixels);
      }
      if (clientData.direction === UserMoveDirections.right) {
        game[socket.id].square.currentCoord.x + clientData.shiftUserPixels > 280
          ? (game[socket.id].square.currentCoord.x = game[socket.id].square.currentCoord.x)
          : (game[socket.id].square.currentCoord.x =
              game[socket.id].square.currentCoord.x + clientData.shiftUserPixels);
      }
      if (clientData.direction === UserMoveDirections.up) {
        game[socket.id].square.currentCoord.y - clientData.shiftUserPixels < 0
          ? (game[socket.id].square.currentCoord.y = game[socket.id].square.currentCoord.y)
          : (game[socket.id].square.currentCoord.y =
              game[socket.id].square.currentCoord.y - clientData.shiftUserPixels);
      }
    };

    setCurrentCoord(clientData);

    io.of("/").to(clientData.roomID).emit("serverMove", game);
  };

  socket.on("clientStartMove", (clientData: { direction: UserMoveDirections; roomID: string }) => {
    if (!socket.rooms.has(clientData.roomID)) {
      return;
    }
    if (!Object.values(UserMoveDirections).includes(clientData.direction)) {
      return;
    }

    let timeCurrent: any;
    let timePrev;

    moveClientSquare = setInterval(() => {
      if (!timeCurrent) {
        timeCurrent = Date.now();
        timePrev = Date.now() - 75;
      } else {
        timePrev = timeCurrent;
        timeCurrent = Date.now();
      }
      const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 25);
      setClientCoordinates({ ...clientData, shiftUserPixels });
    }, 75);
  });

  socket.on("clientStopMove", (data: string) => {
    clearInterval(moveClientSquare);
  });

  socket.on("disconnecting", () => {
    console.log(socket.rooms);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete game[socket.id];

    console.log(socket.id);
    // io.sockets.disconnectSockets();
  });
});

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
