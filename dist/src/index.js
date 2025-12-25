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
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MongoConnect_1 = require("../libs/MongoConnect");
const users_1 = __importDefault(require("./../routes/users"));
const uploadFile_1 = __importDefault(require("../routes/uploadFile"));
const answerTime_1 = __importDefault(require("../routes/answerTime"));
const GTSAttempts_1 = __importDefault(require("../routes/GTSAttempts"));
const webSocketServer_1 = __importDefault(require("../routes/webSocketServer"));
const gameObject_1 = require("../MMORPGDungeonEngine/gameObject/gameObject");
// const cors = require("cors");
const S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const moveObjectsMain_1 = require("../MMORPGDungeonEngine/MoveObjects/moveObjectsMain");
const createGameFieldMain_1 = require("../MMORPGDungeonEngine/CreateGameField/createGameFieldMain");
const attackObjectsMain_1 = require("../MMORPGDungeonEngine/AttackObjects/attackObjectsMain");
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
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    connectionStateRecovery: {},
});
setInterval(() => {
    if (gameObject_1.game.gameIsstarted) {
        exports.io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("sendDataFromServer", {
            // frameObj: game.frameObj,
            attackStatus: gameObject_1.game.attackStatusObj,
            users: gameObject_1.game.users,
            // gameField: game.gameField,
        });
    }
}, 33);
// setInterval(() => {
//   if (!game.users["ORC#1"]) {
//     return;
//   }
//   attackObjectMainMechanism("ORC#1", UserMoveDirections.left, "NPC", "orc3", io);
// }, 3000);
exports.io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on("send-message", (message) => {
        console.log(`Message: ${message} from user ${socket.id}`);
        exports.io.emit("send-message", `Message: ${message} from user ${socket.id}`);
    });
    socket.on("GTSGameRoomMessage", ({ message, currentJoinedRoomID, telegramUser, type, }) => {
        // console.log(io.of("/").adapter.rooms.get("68a82c599d9ad19c1b4ec4d2")?.size);
        exports.io.to(currentJoinedRoomID).emit("roomGTSGameMessage", {
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
            const roomUsers = yield exports.io.in(roomID).fetchSockets();
            for (const socket of roomUsers) {
                users.push(socket.data.userdata);
            }
        }
        catch (error) {
            console.log(error);
        }
        exports.io.of("/").to(roomID).emit("addUserInRoom", users);
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
            const roomUsers = yield exports.io.in(roomID).fetchSockets();
            for (const socket of roomUsers) {
                users.push(socket.data.userdata);
            }
        }
        catch (error) {
            console.log(error);
        }
        exports.io.of("/").to(roomID).emit("deleteUserFromRoom", users);
    }));
    socket.on("getSocketID", () => {
        exports.io.to(socket.id).emit("socketID", socket.id);
    });
    socket.on("startGame", (roomID) => {
        console.log("start game");
        //проверяем есть ли данная комната в списке комнат, к которым подключен данный сокет
        if (!socket.rooms.has(roomID)) {
            return;
        }
        //создаём игровое поле
        (0, createGameFieldMain_1.createGameField)(socket === null || socket === void 0 ? void 0 : socket.id);
        exports.io.of("/").to(roomID).emit("startGameInRoom", {
            usersData: gameObject_1.game.users,
            gameFieldData: gameObject_1.game.gameField,
            frameObject: gameObject_1.game.frameObj,
            statsObj: gameObject_1.game.statObj,
            mapSize: gameObject_1.game.mapSize,
        });
    });
    // setInterval(() => {
    //   console.log(Date.now());
    //   io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("sendDataFromServer", Date.now);
    // }, 1000);
    let moveClientSquare;
    socket.on("clientStartMove", (clientData) => {
        if (!socket.rooms.has(clientData.roomID)) {
            return;
        }
        if (!Object.values(gameObject_1.UserMoveDirections).includes(clientData.direction)) {
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
            const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 10);
            (0, moveObjectsMain_1.setClientCoordinates)("gamer", socket.id, Object.assign(Object.assign({}, clientData), { shiftUserPixels }));
        }, 33);
    });
    socket.on("clientStopMove", (data) => {
        var _a;
        if ((_a = gameObject_1.game.users[socket.id]) === null || _a === void 0 ? void 0 : _a.moveDirection) {
            // game.users[socket.id].moveDirection = UserMoveDirections.stop;
        }
        clearInterval(moveClientSquare);
    });
    socket.on("clientStartAttack", (clientData) => {
        var _a;
        (0, attackObjectsMain_1.attackObjectMainMechanism)(socket.id, (_a = gameObject_1.game.users[socket.id]) === null || _a === void 0 ? void 0 : _a.moveDirection, "gamer", "gamer", exports.io);
    });
    socket.on("clientLevelUpHandler", (upStatData) => {
        //тут увеличиваем харктеристики
        console.log(upStatData);
        if (!gameObject_1.game.statObj.gamers[upStatData.userID])
            return;
        if (gameObject_1.game.statObj.gamers[upStatData.userID].levelPoints === 0)
            return;
        if (upStatData.upStat === "HP") {
            gameObject_1.game.statObj.gamers[upStatData.userID].baseHP =
                gameObject_1.game.statObj.gamers[upStatData.userID].baseHP + 10;
            gameObject_1.game.statObj.gamers[upStatData.userID].percentHP =
                gameObject_1.game.statObj.gamers[upStatData.userID].currentHP /
                    gameObject_1.game.statObj.gamers[upStatData.userID].baseHP;
            gameObject_1.game.statObj.gamers[upStatData.userID].levelPoints =
                gameObject_1.game.statObj.gamers[upStatData.userID].levelPoints - 1;
            exports.io.of("/").to("68a82c599d9ad19c1b4ec4d2").emit("serverIncreaseUserXP", {
                userID: upStatData.userID,
                userStat: gameObject_1.game.statObj.gamers[upStatData.userID],
            });
            return;
        }
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
