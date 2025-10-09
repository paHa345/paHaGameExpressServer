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
import { String } from "aws-sdk/clients/apigateway";

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
  stop = "stop",
}

interface IGameUserMain<T> {
  [socketID: string]: T;
}

interface IGameMain {
  goodPlayer?: string;
  gameField: {
    [row: number]: {
      [col: number]: {
        type?: string;
        notMove: boolean;
        coord: {
          topLeft: { x: number; y: number };
          topRight: { x: number; y: number };
          bottomLeft: { x: number; y: number };
          bottomRight: { x: number; y: number };
        };
      };
    };
  };
  frameObj: {
    mainFrame: number;
    objects: {
      [id: string]: {
        idFrame: number;
      };
    };
  };
  attackStatusObj: {
    [objectID: string]: {
      time?: number | undefined;
      isCooldown: boolean;
      isActive: boolean;
    };
  };
  users: IGameUserMain<{
    square: {
      prevCoord: {
        topLeft: {
          x: number;
          y: number;
        };
        topRight: {
          x: number;
          y: number;
        };
        bottomLeft: {
          x: number;
          y: number;
        };
        bottomRight: {
          x: number;
          y: number;
        };
      };
      currentCoord: {
        topLeft: {
          x: number;
          y: number;
        };
        topRight: {
          x: number;
          y: number;
        };
        bottomLeft: {
          x: number;
          y: number;
        };
        bottomRight: {
          x: number;
          y: number;
        };
      };
    };
    userRole: string;
    attackStatus: { time?: number; isCooldown: boolean };
    moveDirection: UserMoveDirections;
  }>;
}

const game: IGameMain = {
  users: {},
  gameField: {},
  attackStatusObj: {},
  frameObj: {
    mainFrame: 0,
    objects: {},
  },
};

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

    //создаём игровое поле

    const gameFieldCreatedObj: any = {};

    for (let i = 0; i < 50; i++) {
      const gameFieldCreatedObjRow: any = {};
      for (let j = 0; j < 50; j++) {
        gameFieldCreatedObjRow[j] = {};
      }

      game.gameField[i] = gameFieldCreatedObjRow;
    }

    game.gameField[10][10].type = "stone";
    game.gameField[10][10].notMove = true;
    game.gameField[10][10].coord = {
      topLeft: { x: 8 * 10, y: 8 * 10 },
      topRight: { x: 8 * 10 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 10, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[10][11].type = "stone";
    game.gameField[10][11].notMove = true;

    game.gameField[10][11].coord = {
      topLeft: { x: 8 * 10, y: 8 * 11 },
      topRight: { x: 8 * 10 + 8, y: 8 * 11 },
      bottomLeft: { x: 8 * 10, y: 8 * 11 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 11 + 8 },
    };
    game.gameField[10][12].type = "stone";
    game.gameField[10][12].notMove = true;

    game.gameField[10][12].coord = {
      topLeft: { x: 8 * 10, y: 8 * 12 },
      topRight: { x: 8 * 10 + 8, y: 8 * 12 },
      bottomLeft: { x: 8 * 10, y: 8 * 12 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 12 + 8 },
    };
    game.gameField[10][13].type = "stone";
    game.gameField[10][13].notMove = true;

    game.gameField[10][13].coord = {
      topLeft: { x: 8 * 10, y: 8 * 13 },
      topRight: { x: 8 * 10 + 8, y: 8 * 13 },
      bottomLeft: { x: 8 * 10, y: 8 * 13 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 13 + 8 },
    };
    game.gameField[10][14].type = "stone";
    game.gameField[10][14].notMove = true;
    game.gameField[10][14].coord = {
      topLeft: { x: 8 * 10, y: 8 * 14 },
      topRight: { x: 8 * 10 + 8, y: 8 * 14 },
      bottomLeft: { x: 8 * 10, y: 8 * 14 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 14 + 8 },
    };
    game.gameField[10][15].type = "stone";
    game.gameField[10][15].notMove = true;
    game.gameField[10][15].coord = {
      topLeft: { x: 8 * 10, y: 8 * 15 },
      topRight: { x: 8 * 10 + 8, y: 8 * 15 },
      bottomLeft: { x: 8 * 10, y: 8 * 15 + 8 },
      bottomRight: { x: 8 * 10 + 8, y: 8 * 15 + 8 },
    };
    game.gameField[11][10].type = "stone";
    game.gameField[11][10].notMove = true;
    game.gameField[11][10].coord = {
      topLeft: { x: 8 * 11, y: 8 * 10 },
      topRight: { x: 8 * 11 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 11, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 11 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[12][10].type = "stone";
    game.gameField[12][10].notMove = true;
    game.gameField[12][10].coord = {
      topLeft: { x: 8 * 12, y: 8 * 10 },
      topRight: { x: 8 * 12 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 12, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 12 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[13][10].type = "stone";
    game.gameField[13][10].notMove = true;
    game.gameField[13][10].coord = {
      topLeft: { x: 8 * 13, y: 8 * 10 },
      topRight: { x: 8 * 13 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 13, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 13 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[14][10].type = "stone";
    game.gameField[14][10].notMove = true;
    game.gameField[14][10].coord = {
      topLeft: { x: 8 * 14, y: 8 * 10 },
      topRight: { x: 8 * 14 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 14, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 14 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[15][10].type = "stone";
    game.gameField[15][10].notMove = true;
    game.gameField[15][10].coord = {
      topLeft: { x: 8 * 15, y: 8 * 10 },
      topRight: { x: 8 * 15 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 15, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 15 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[16][10].type = "stone";
    game.gameField[16][10].notMove = true;
    game.gameField[16][10].coord = {
      topLeft: { x: 8 * 16, y: 8 * 10 },
      topRight: { x: 8 * 16 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 16, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 16 + 8, y: 8 * 10 + 8 },
    };

    game.gameField[4][10].type = "stone";
    game.gameField[4][10].notMove = true;
    game.gameField[4][10].coord = {
      topLeft: { x: 8 * 4, y: 8 * 10 },
      topRight: { x: 8 * 4 + 8, y: 8 * 10 },
      bottomLeft: { x: 8 * 4, y: 8 * 10 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 10 + 8 },
    };
    game.gameField[4][11].type = "stone";
    game.gameField[4][11].notMove = true;
    game.gameField[4][11].coord = {
      topLeft: { x: 8 * 4, y: 8 * 11 },
      topRight: { x: 8 * 4 + 8, y: 8 * 11 },
      bottomLeft: { x: 8 * 4, y: 8 * 11 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 11 + 8 },
    };
    game.gameField[4][12].type = "stone";
    game.gameField[4][12].notMove = true;
    game.gameField[4][12].coord = {
      topLeft: { x: 8 * 4, y: 8 * 12 },
      topRight: { x: 8 * 4 + 8, y: 8 * 12 },
      bottomLeft: { x: 8 * 4, y: 8 * 12 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 12 + 8 },
    };
    game.gameField[4][13].type = "stone";
    game.gameField[4][13].notMove = true;
    game.gameField[4][13].coord = {
      topLeft: { x: 8 * 4, y: 8 * 13 },
      topRight: { x: 8 * 4 + 8, y: 8 * 13 },
      bottomLeft: { x: 8 * 4, y: 8 * 13 + 8 },
      bottomRight: { x: 8 * 4 + 8, y: 8 * 13 + 8 },
    };

    const numberOfGamers = Object.keys(game.users).length;

    game.users[socket.id] = {
      attackStatus: { isCooldown: false },
      square: {
        prevCoord: {
          topLeft: {
            x: 10 + numberOfGamers * 40,
            y: 10,
          },
          topRight: {
            x: 10 + 16 + numberOfGamers * 40,
            y: 10,
          },
          bottomLeft: {
            x: 10 + numberOfGamers * 40,
            y: 10 + 16,
          },
          bottomRight: {
            x: 10 + 16 + numberOfGamers * 40,
            y: 10 + 16,
          },
        },

        currentCoord: {
          topLeft: {
            x: 10 + numberOfGamers * 40,
            y: 10,
          },
          topRight: {
            x: 10 + 16 + numberOfGamers * 40,
            y: 10,
          },
          bottomLeft: {
            x: 10 + numberOfGamers * 40,
            y: 10 + 16,
          },
          bottomRight: {
            x: 10 + 16 + numberOfGamers * 40,
            y: 10 + 16,
          },
        },
      },
      moveDirection: UserMoveDirections.stop,
      userRole: numberOfGamers > 0 ? "creeper" : "steve",
    };
    game.frameObj.objects[socket?.id] = { idFrame: 0 };
    io.of("/").to(roomID).emit("startGameInRoom", {
      usersData: game.users,
      gameFieldData: game.gameField,
      frameObject: game.frameObj,
    });
  });

  let moveClientSquare: any;
  const setClientCoordinates = (clientData: {
    direction: UserMoveDirections;
    roomID: string;
    shiftUserPixels: number;
  }) => {
    if (game.users[socket.id]) {
      game.users[socket.id].square.prevCoord = JSON.parse(
        JSON.stringify(game.users[socket.id].square.currentCoord)
      );
    }

    const setMoveCoord = () => {
      if (clientData.direction === UserMoveDirections.down) {
        game.users[socket.id].square.currentCoord.bottomLeft.y =
          game.users[socket.id].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.bottomRight.y =
          game.users[socket.id].square.currentCoord.bottomRight.y + clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topLeft.y =
          game.users[socket.id].square.currentCoord.topLeft.y + clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topRight.y =
          game.users[socket.id].square.currentCoord.topRight.y + clientData.shiftUserPixels;
      }
      if (clientData.direction === UserMoveDirections.left) {
        game.users[socket.id].square.currentCoord.bottomLeft.x =
          game.users[socket.id].square.currentCoord.bottomLeft.x - clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.bottomRight.x =
          game.users[socket.id].square.currentCoord.bottomRight.x - clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topLeft.x =
          game.users[socket.id].square.currentCoord.topLeft.x - clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topRight.x =
          game.users[socket.id].square.currentCoord.topRight.x - clientData.shiftUserPixels;
      }
      if (clientData.direction === UserMoveDirections.right) {
        game.users[socket.id].square.currentCoord.bottomLeft.x =
          game.users[socket.id].square.currentCoord.bottomLeft.x + clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.bottomRight.x =
          game.users[socket.id].square.currentCoord.bottomRight.x + clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topLeft.x =
          game.users[socket.id].square.currentCoord.topLeft.x + clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topRight.x =
          game.users[socket.id].square.currentCoord.topRight.x + clientData.shiftUserPixels;
      }
      if (clientData.direction === UserMoveDirections.up) {
        game.users[socket.id].square.currentCoord.bottomLeft.y =
          game.users[socket.id].square.currentCoord.bottomLeft.y - clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.bottomRight.y =
          game.users[socket.id].square.currentCoord.bottomRight.y - clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topLeft.y =
          game.users[socket.id].square.currentCoord.topLeft.y - clientData.shiftUserPixels;
        game.users[socket.id].square.currentCoord.topRight.y =
          game.users[socket.id].square.currentCoord.topRight.y - clientData.shiftUserPixels;
      }
    };

    const setCurrentCoord = function (clientData: {
      direction: UserMoveDirections;
      roomID: string;
      shiftUserPixels: number;
    }) {
      if (!game.users[socket.id]) return;

      game.users[socket.id].moveDirection = clientData.direction;
      if (clientData.direction === UserMoveDirections.down) {
        game.users[socket.id].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels > 300 ||
        game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomLeft.y / 8)][
          Math.floor((game.users[socket.id].square.currentCoord.bottomLeft.x + 5) / 8)
        ]?.notMove ||
        game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomRight.y / 8)][
          Math.floor((game.users[socket.id].square.currentCoord.bottomRight.x - 5) / 8)
        ]?.notMove
          ? (game.users[socket.id].square.currentCoord.bottomLeft.y =
              game.users[socket.id].square.currentCoord.bottomLeft.y)
          : setMoveCoord();
      }
      if (clientData.direction === UserMoveDirections.left) {
        game.users[socket.id].square.currentCoord.topLeft.x - clientData.shiftUserPixels < 0 ||
        game.gameField[Math.floor((game.users[socket.id].square.currentCoord.topLeft.y + 5) / 8)][
          Math.floor(game.users[socket.id].square.currentCoord.topLeft.x / 8)
        ]?.notMove ||
        game.gameField[
          Math.floor((game.users[socket.id].square.currentCoord.bottomLeft.y - 5) / 8)
        ][Math.floor(game.users[socket.id].square.currentCoord.bottomLeft.x / 8)]?.notMove
          ? (game.users[socket.id].square.currentCoord.topLeft.x =
              game.users[socket.id].square.currentCoord.topLeft.x)
          : setMoveCoord();
      }
      if (clientData.direction === UserMoveDirections.right) {
        game.users[socket.id].square.currentCoord.topRight.x + clientData.shiftUserPixels > 300 ||
        game.gameField[Math.floor((game.users[socket.id].square.currentCoord.topRight.y + 5) / 8)][
          Math.floor(game.users[socket.id].square.currentCoord.topRight.x / 8)
        ]?.notMove ||
        game.gameField[
          Math.floor((game.users[socket.id].square.currentCoord.bottomRight.y - 5) / 8)
        ][Math.floor(game.users[socket.id].square.currentCoord.bottomRight.x / 8)]?.notMove
          ? (game.users[socket.id].square.currentCoord.topRight.x =
              game.users[socket.id].square.currentCoord.topRight.x)
          : setMoveCoord();
      }
      if (clientData.direction === UserMoveDirections.up) {
        game.users[socket.id].square.currentCoord.topLeft.y - clientData.shiftUserPixels < 0 ||
        game.gameField[Math.floor(game.users[socket.id].square.currentCoord.topLeft.y / 8)][
          Math.floor((game.users[socket.id].square.currentCoord.topLeft.x + 5) / 8)
        ]?.notMove ||
        game.gameField[Math.floor(game.users[socket.id].square.currentCoord.topRight.y / 8)][
          Math.floor((game.users[socket.id].square.currentCoord.topRight.x - 5) / 8)
        ]?.notMove
          ? (game.users[socket.id].square.currentCoord.topLeft.y =
              game.users[socket.id].square.currentCoord.topLeft.y)
          : setMoveCoord();
      }
    };

    setCurrentCoord(clientData);

    io.of("/").to(clientData.roomID).emit("serverMove", game.users);
  };

  socket.on("clientStartMove", (clientData: { direction: UserMoveDirections; roomID: string }) => {
    if (!socket.rooms.has(clientData.roomID)) {
      return;
    }
    if (!Object.values(UserMoveDirections).includes(clientData.direction)) {
      return;
    }

    clearInterval(moveClientSquare);

    let timeCurrent: any;
    let timePrev;

    moveClientSquare = setInterval(() => {
      if (!timeCurrent) {
        timeCurrent = Date.now();
        timePrev = Date.now() - 33;
      } else {
        timePrev = timeCurrent;
        timeCurrent = Date.now();
      }
      const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 20);
      setClientCoordinates({ ...clientData, shiftUserPixels });
    }, 33);
  });

  socket.on("clientStopMove", (data: string) => {
    if (game.users[socket.id]?.moveDirection) {
      game.users[socket.id].moveDirection = UserMoveDirections.stop;
    }
    clearInterval(moveClientSquare);
  });
  socket.on("clientStartAttack", (clientData: { roomID: string }) => {
    const startAttackTimestamp = Date.now();
    game.attackStatusObj[socket?.id] = {
      time: startAttackTimestamp,
      isCooldown: true,
      isActive: true,
    };

    io.of("/").to(clientData.roomID).emit("serverStartAttack", {
      roomID: clientData.roomID,
      socketID: socket.id,
      attackStatusObj: game.attackStatusObj,
    });

    let stopAttackInterval: any;

    stopAttackInterval = setInterval(() => {
      if (Date.now() - startAttackTimestamp > 500) {
        game.attackStatusObj[socket?.id].isActive = false;

        io.of("/").to(clientData.roomID).emit("serverStopAttack", game.attackStatusObj);
        clearInterval(stopAttackInterval);
      }
    }, 100);

    let cooldownInterval: any;

    cooldownInterval = setInterval(() => {
      if (Date.now() - startAttackTimestamp > 1000) {
        // game.users[socket.id].attackStatus.isCooldown = false;
        io.of("/").to(clientData.roomID).emit("serverStopAttackCooldown", {
          // roomID: clientData.roomID,
          // socketID: socket.id,
          // attackStatus: game.users[socket.id].attackStatus,
          // isCooldown: false,
        });
        clearInterval(cooldownInterval);
      }
      // console.log(startAttackTimestamp - Date.now() + 1000);
    }, 100);
  });

  socket.on("disconnecting", () => {
    console.log(socket.rooms);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete game.users[socket.id];

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
