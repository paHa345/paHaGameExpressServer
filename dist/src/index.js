"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MongoConnect_1 = require("../libs/MongoConnect");
const users_1 = __importDefault(require("./../routes/users"));
const uploadFile_1 = __importDefault(require("../routes/uploadFile"));
const answerTime_1 = __importDefault(require("../routes/answerTime"));
const GTSAttempts_1 = __importDefault(require("../routes/GTSAttempts"));
const webSocketServer_1 = __importDefault(require("../routes/webSocketServer"));
const gameObject_1 = require("../objects/gameObject");
const gameObject_2 = require("../objects/gameObject");
// const cors = require("cors");
const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
const corsOptions = {
    origin: "https://s3.timeweb.com",
    optionsSuccessStatus: 200,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
// app.get("/GTSAttempts/:attemptID", async (req: Request, res: Response) => {
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    connectionStateRecovery: {},
});
setInterval(() => {
    if (gameObject_1.game.gameIsstarted) {
        io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("sendDataFromServer", {
            frameObj: gameObject_1.game.frameObj,
            attackStatus: gameObject_1.game.attackStatusObj,
            users: gameObject_1.game.users,
            // gameField: game.gameField,
        });
    }
}, 33);
setInterval(() => {
    if (gameObject_1.game.gameIsstarted) {
        (0, gameObject_1.increaseFrameNumber)();
    }
}, 150);
io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on("send-message", (message) => {
        console.log(`Message: ${message} from user ${socket.id}`);
        io.emit("send-message", `Message: ${message} from user ${socket.id}`);
    });
    socket.on("GTSGameRoomMessage", ({ message, currentJoinedRoomID, telegramUser, type, }) => {
        // console.log(io.of("/").adapter.rooms.get("68a82c599d9ad19c1b4ec4d2")?.size);
        io.to(currentJoinedRoomID).emit("roomGTSGameMessage", {
            message: message,
            telegramUserID: telegramUser.id,
            telegramUserName: telegramUser.username,
            messageDate: Date.now(),
            photo_url: telegramUser.photo_url,
            type,
        });
    });
    socket.on("join_room", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomID, telegramUser, type }) {
        socket.data.userdata = {
            username: telegramUser.username,
            userID: telegramUser.id,
            photoURL: telegramUser.photo_url,
            socketID: socket.id,
        };
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("joinRoomUserMessage", {
            message: `Пользователь ${telegramUser.username ? telegramUser.username : telegramUser.id} подключился`,
            roomID: roomID,
            type,
        });
        const users = [];
        try {
            const roomUsers = yield io.in(roomID).fetchSockets();
            for (const socket of roomUsers) {
                users.push(socket.data.userdata);
            }
        }
        catch (error) {
            console.log(error);
        }
        io.of("/").to(roomID).emit("addUserInRoom", users);
    }));
    socket.on("leave_room", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomID, telegramUser, type }) {
        socket.leave(roomID);
        socket.broadcast.to(roomID).emit("leaveRoomUserMessage", {
            message: `Пользователь ${telegramUser.username ? telegramUser.username : telegramUser.id} отключился`,
            roomID: roomID,
            type,
        });
        const users = [];
        try {
            const roomUsers = yield io.in(roomID).fetchSockets();
            for (const socket of roomUsers) {
                users.push(socket.data.userdata);
            }
        }
        catch (error) {
            console.log(error);
        }
        io.of("/").to(roomID).emit("deleteUserFromRoom", users);
    }));
    socket.on("getSocketID", () => {
        io.to(socket.id).emit("socketID", socket.id);
    });
    socket.on("startGame", (roomID) => {
        console.log("start game");
        //проверяем есть ли данная комната в списке комнат, к которым подключен данный сокет
        if (!socket.rooms.has(roomID)) {
            return;
        }
        //создаём игровое поле
        (0, gameObject_1.createGameField)(socket === null || socket === void 0 ? void 0 : socket.id);
        io.of("/").to(roomID).emit("startGameInRoom", {
            usersData: gameObject_1.game.users,
            gameFieldData: gameObject_1.game.gameField,
            frameObject: gameObject_1.game.frameObj,
        });
    });
    // setInterval(() => {
    //   console.log(Date.now());
    //   io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("sendDataFromServer", Date.now);
    // }, 1000);
    let moveClientSquare;
    // const setClientCoordinates = (clientData: {
    //   direction: UserMoveDirections;
    //   roomID: string;
    //   shiftUserPixels: number;
    // }) => {
    //   if (game.users[socket.id]) {
    //     game.users[socket.id].square.prevCoord = JSON.parse(
    //       JSON.stringify(game.users[socket.id].square.currentCoord)
    //     );
    //   }
    //   const setMoveCoord = () => {
    //     if (clientData.direction === UserMoveDirections.down) {
    //       game.users[socket.id].square.currentCoord.bottomLeft.y =
    //         game.users[socket.id].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.bottomRight.y =
    //         game.users[socket.id].square.currentCoord.bottomRight.y + clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topLeft.y =
    //         game.users[socket.id].square.currentCoord.topLeft.y + clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topRight.y =
    //         game.users[socket.id].square.currentCoord.topRight.y + clientData.shiftUserPixels;
    //     }
    //     if (clientData.direction === UserMoveDirections.left) {
    //       game.users[socket.id].square.currentCoord.bottomLeft.x =
    //         game.users[socket.id].square.currentCoord.bottomLeft.x - clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.bottomRight.x =
    //         game.users[socket.id].square.currentCoord.bottomRight.x - clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topLeft.x =
    //         game.users[socket.id].square.currentCoord.topLeft.x - clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topRight.x =
    //         game.users[socket.id].square.currentCoord.topRight.x - clientData.shiftUserPixels;
    //     }
    //     if (clientData.direction === UserMoveDirections.right) {
    //       game.users[socket.id].square.currentCoord.bottomLeft.x =
    //         game.users[socket.id].square.currentCoord.bottomLeft.x + clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.bottomRight.x =
    //         game.users[socket.id].square.currentCoord.bottomRight.x + clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topLeft.x =
    //         game.users[socket.id].square.currentCoord.topLeft.x + clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topRight.x =
    //         game.users[socket.id].square.currentCoord.topRight.x + clientData.shiftUserPixels;
    //     }
    //     if (clientData.direction === UserMoveDirections.up) {
    //       game.users[socket.id].square.currentCoord.bottomLeft.y =
    //         game.users[socket.id].square.currentCoord.bottomLeft.y - clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.bottomRight.y =
    //         game.users[socket.id].square.currentCoord.bottomRight.y - clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topLeft.y =
    //         game.users[socket.id].square.currentCoord.topLeft.y - clientData.shiftUserPixels;
    //       game.users[socket.id].square.currentCoord.topRight.y =
    //         game.users[socket.id].square.currentCoord.topRight.y - clientData.shiftUserPixels;
    //     }
    //   };
    //   const setCurrentCoord = function (clientData: {
    //     direction: UserMoveDirections;
    //     roomID: string;
    //     shiftUserPixels: number;
    //   }) {
    //     if (!game.users[socket.id]) return;
    //     game.users[socket.id].moveDirection = clientData.direction;
    //     if (clientData.direction === UserMoveDirections.down) {
    //       // смотрим чанки, на которые хотим встать
    //       game.users[socket.id].square.currentCoord.bottomLeft.y + clientData.shiftUserPixels > 300 ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomLeft.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomLeft.x + 5) / 8)
    //       ]?.notMove ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomRight.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomRight.x - 5) / 8)
    //       ]?.notMove ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomLeft.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomLeft.x + 5) / 8)
    //       ]?.isUserChank ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomRight.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomRight.x - 5) / 8)
    //       ]?.isUserChank
    //         ? (game.users[socket.id].square.currentCoord.bottomLeft.y =
    //             game.users[socket.id].square.currentCoord.bottomLeft.y)
    //         : setMoveCoord();
    //     }
    //     if (clientData.direction === UserMoveDirections.left) {
    //       game.users[socket.id].square.currentCoord.topLeft.x - clientData.shiftUserPixels < 0 ||
    //       game.gameField[Math.floor((game.users[socket.id].square.currentCoord.topLeft.y + 5) / 8)][
    //         Math.floor(game.users[socket.id].square.currentCoord.topLeft.x / 8)
    //       ]?.notMove ||
    //       game.gameField[
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomLeft.y - 5) / 8)
    //       ][Math.floor(game.users[socket.id].square.currentCoord.bottomLeft.x / 8)]?.notMove ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.topLeft.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.topLeft.x - 8) / 8)
    //       ]?.isUserChank ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomLeft.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomLeft.x - 8) / 8)
    //       ]?.isUserChank
    //         ? (game.users[socket.id].square.currentCoord.topLeft.x =
    //             game.users[socket.id].square.currentCoord.topLeft.x)
    //         : setMoveCoord();
    //     }
    //     if (clientData.direction === UserMoveDirections.right) {
    //       game.users[socket.id].square.currentCoord.topRight.x + clientData.shiftUserPixels > 300 ||
    //       game.gameField[Math.floor((game.users[socket.id].square.currentCoord.topRight.y + 5) / 8)][
    //         Math.floor(game.users[socket.id].square.currentCoord.topRight.x / 8)
    //       ]?.notMove ||
    //       game.gameField[
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomRight.y - 5) / 8)
    //       ][Math.floor(game.users[socket.id].square.currentCoord.bottomRight.x / 8)]?.notMove ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.topRight.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.topRight.x + 8) / 8)
    //       ]?.isUserChank ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.bottomRight.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.bottomRight.x + 8) / 8)
    //       ]?.isUserChank
    //         ? (game.users[socket.id].square.currentCoord.topRight.x =
    //             game.users[socket.id].square.currentCoord.topRight.x)
    //         : setMoveCoord();
    //     }
    //     if (clientData.direction === UserMoveDirections.up) {
    //       if (Math.floor((game.users[socket.id].square.currentCoord.topLeft.y - 13) / 8) < 0) {
    //         return;
    //       }
    //       game.users[socket.id].square.currentCoord.topLeft.y - clientData.shiftUserPixels < 0 ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.topLeft.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.topLeft.x + 5) / 8)
    //       ]?.notMove ||
    //       game.gameField[Math.floor(game.users[socket.id].square.currentCoord.topRight.y / 8)][
    //         Math.floor((game.users[socket.id].square.currentCoord.topRight.x - 5) / 8)
    //       ]?.notMove ||
    //       game.gameField[Math.floor((game.users[socket.id].square.currentCoord.topLeft.y - 8) / 8)][
    //         Math.floor(game.users[socket.id].square.currentCoord.topLeft.x / 8)
    //       ]?.isUserChank ||
    //       game.gameField[Math.floor((game.users[socket.id].square.currentCoord.topLeft.y - 8) / 8)][
    //         Math.floor(game.users[socket.id].square.currentCoord.topRight.x / 8)
    //       ]?.isUserChank
    //         ? (game.users[socket.id].square.currentCoord.topLeft.y =
    //             game.users[socket.id].square.currentCoord.topLeft.y)
    //         : setMoveCoord();
    //     }
    //   };
    //   setCurrentCoord(clientData);
    //   setUserCurrentChanks(socket.id, clientData.direction);
    //   // io.of("/").to(clientData.roomID).emit("serverMove", game.users);
    // };
    socket.on("clientStartMove", (clientData) => {
        if (!socket.rooms.has(clientData.roomID)) {
            return;
        }
        if (!Object.values(gameObject_2.UserMoveDirections).includes(clientData.direction)) {
            return;
        }
        clearInterval(moveClientSquare);
        let timeCurrent;
        let timePrev;
        moveClientSquare = setInterval(() => {
            if (!timeCurrent) {
                timeCurrent = Date.now();
                timePrev = Date.now() - 33;
            }
            else {
                timePrev = timeCurrent;
                timeCurrent = Date.now();
            }
            const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 20);
            (0, gameObject_1.setClientCoordinates)(socket.id, Object.assign(Object.assign({}, clientData), { shiftUserPixels }));
        }, 33);
    });
    socket.on("clientStopMove", (data) => {
        var _a;
        if ((_a = gameObject_1.game.users[socket.id]) === null || _a === void 0 ? void 0 : _a.moveDirection) {
            gameObject_1.game.users[socket.id].moveDirection = gameObject_2.UserMoveDirections.stop;
        }
        clearInterval(moveClientSquare);
    });
    socket.on("clientStartAttack", (clientData) => {
        var _a, _b;
        if ((_a = gameObject_1.game.attackStatusObj[socket.id]) === null || _a === void 0 ? void 0 : _a.isCooldown) {
            return;
        }
        if ((_b = gameObject_1.game.attackStatusObj[socket.id]) === null || _b === void 0 ? void 0 : _b.isActive) {
            return;
        }
        const startAttackTimestamp = Date.now();
        gameObject_1.game.attackStatusObj[socket === null || socket === void 0 ? void 0 : socket.id] = {
            time: startAttackTimestamp,
            isCooldown: true,
            isActive: true,
        };
        // increaseFrameNumber();
        // io.of("/").to(clientData.roomID).emit("serverStartAttack", {
        //   roomID: clientData.roomID,
        //   socketID: socket.id,
        //   attackStatusObj: game.attackStatusObj,
        // });
        let stopAttackInterval;
        stopAttackInterval = setInterval(() => {
            if (Date.now() - startAttackTimestamp > 500) {
                gameObject_1.game.attackStatusObj[socket === null || socket === void 0 ? void 0 : socket.id].isActive = false;
                // console.log("Stop interval");
                // increaseFrameNumber();
                // io.of("/").to(clientData.roomID).emit("serverStopAttack", {
                //   attackStatusObj: game.attackStatusObj,
                // });
                clearInterval(stopAttackInterval);
            }
        }, 100);
        let cooldownInterval;
        cooldownInterval = setInterval(() => {
            if (Date.now() - startAttackTimestamp > 1000) {
                gameObject_1.game.attackStatusObj[socket.id].isCooldown = false;
                // io.of("/").to(clientData.roomID).emit("serverStopAttackCooldown", {
                //   // roomID: clientData.roomID,
                //   // socketID: socket.id,
                //   // attackStatus: game.users[socket.id].attackStatus,
                //   // isCooldown: false,
                // });
                // console.log("Stop interval");
                // increaseFrameNumber();
                // io.of("/").to(clientData.roomID).emit("serverResetCooldown", {
                //   attackStatusObj: game.attackStatusObj,
                // });
                clearInterval(cooldownInterval);
            }
        }, 100);
    });
    socket.on("resetCraftOrgServer", (data) => {
        console.log(data);
        gameObject_1.game.attackStatusObj = {};
        gameObject_1.game.gameIsstarted = false;
        gameObject_1.game.gameField = {};
        gameObject_1.game.users = {};
        gameObject_1.game.frameObj = {
            mainFrame: 0,
            objects: {},
        };
    });
    socket.on("disconnecting", () => {
        console.log(socket.rooms);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
        delete gameObject_1.game.users[socket.id];
        console.log(socket.id);
        // io.sockets.disconnectSockets();
    });
});
const logMiddleware = (req, res, next) => {
    // console.log(`Request URL: ${req.url}`);
    next(); // Pass control to the next handler
};
const authenticate = (req, res, next) => {
    // console.log("Authentication middleware");
    next(); // Proceed to the next middleware
};
const authorize = (req, res, next) => {
    // console.log("Authorization middleware");
    next(); // Proceed to the route handler
};
app.use(logMiddleware); // Apply middleware globally
app.use("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.get("/", authenticate, authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.use("/users", users_1.default);
app.use("/GTSAttempts", GTSAttempts_1.default);
app.use("/answerTime", answerTime_1.default);
app.use("/uploadFile", uploadFile_1.default);
app.use("/webSocketServer", webSocketServer_1.default);
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, MongoConnect_1.connectMongoDB)();
        console.log(`[server]: Server is running at http://localhost:${port} and connect to database`);
    }
    catch (error) {
        console.log(error);
    }
}));
