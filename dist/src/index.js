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
var UserMoveDirections;
(function (UserMoveDirections) {
    UserMoveDirections["right"] = "right";
    UserMoveDirections["down"] = "down";
    UserMoveDirections["up"] = "up";
    UserMoveDirections["left"] = "left";
})(UserMoveDirections || (UserMoveDirections = {}));
const game = {};
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
        const numberOfGamers = Object.keys(game).length;
        game[socket.id] = {
            square: {
                prevCoord: {
                    x1: 10 + numberOfGamers * 40,
                    x2: 30 + numberOfGamers * 40,
                    y1: 10,
                    y2: 30,
                },
                currentCoord: {
                    x1: 10 + numberOfGamers * 40,
                    x2: 30 + numberOfGamers * 40,
                    y1: 10,
                    y2: 30,
                },
            },
            userRole: numberOfGamers > 0 ? "creeper" : "steve",
        };
        console.log(Object.keys(game).length);
        io.of("/").to(roomID).emit("startGameInRoom", game);
    });
    let moveClientSquare;
    const setClientCoordinates = (clientData) => {
        game[socket.id].square.prevCoord = JSON.parse(JSON.stringify(game[socket.id].square.currentCoord));
        const setMoveCoord = () => {
            if (clientData.direction === UserMoveDirections.down) {
                game[socket.id].square.currentCoord.y1 =
                    game[socket.id].square.currentCoord.y1 + clientData.shiftUserPixels;
                game[socket.id].square.currentCoord.y2 =
                    game[socket.id].square.currentCoord.y2 + clientData.shiftUserPixels;
            }
            if (clientData.direction === UserMoveDirections.left) {
                game[socket.id].square.currentCoord.x1 =
                    game[socket.id].square.currentCoord.x1 - clientData.shiftUserPixels;
                game[socket.id].square.currentCoord.x2 =
                    game[socket.id].square.currentCoord.x2 - clientData.shiftUserPixels;
            }
            if (clientData.direction === UserMoveDirections.right) {
                game[socket.id].square.currentCoord.x1 =
                    game[socket.id].square.currentCoord.x1 + clientData.shiftUserPixels;
                game[socket.id].square.currentCoord.x2 =
                    game[socket.id].square.currentCoord.x2 + clientData.shiftUserPixels;
            }
            if (clientData.direction === UserMoveDirections.up) {
                game[socket.id].square.currentCoord.y1 =
                    game[socket.id].square.currentCoord.y1 - clientData.shiftUserPixels;
                game[socket.id].square.currentCoord.y2 =
                    game[socket.id].square.currentCoord.y2 - clientData.shiftUserPixels;
            }
        };
        const setCurrentCoord = function (clientData) {
            if (clientData.direction === UserMoveDirections.down) {
                game[socket.id].square.currentCoord.y1 + clientData.shiftUserPixels > 300
                    ? (game[socket.id].square.currentCoord.y1 = game[socket.id].square.currentCoord.y1)
                    : setMoveCoord();
            }
            if (clientData.direction === UserMoveDirections.left) {
                game[socket.id].square.currentCoord.x1 - clientData.shiftUserPixels < 0
                    ? (game[socket.id].square.currentCoord.x1 = game[socket.id].square.currentCoord.x1)
                    : setMoveCoord();
            }
            if (clientData.direction === UserMoveDirections.right) {
                game[socket.id].square.currentCoord.x2 + clientData.shiftUserPixels > 300
                    ? (game[socket.id].square.currentCoord.x2 = game[socket.id].square.currentCoord.x2)
                    : setMoveCoord();
            }
            if (clientData.direction === UserMoveDirections.up) {
                game[socket.id].square.currentCoord.y1 - clientData.shiftUserPixels < 0
                    ? (game[socket.id].square.currentCoord.y1 = game[socket.id].square.currentCoord.y1)
                    : setMoveCoord();
            }
        };
        setCurrentCoord(clientData);
        io.of("/").to(clientData.roomID).emit("serverMove", game);
    };
    socket.on("clientStartMove", (clientData) => {
        if (!socket.rooms.has(clientData.roomID)) {
            return;
        }
        if (!Object.values(UserMoveDirections).includes(clientData.direction)) {
            return;
        }
        let timeCurrent;
        let timePrev;
        moveClientSquare = setInterval(() => {
            if (!timeCurrent) {
                timeCurrent = Date.now();
                timePrev = Date.now() - 75;
            }
            else {
                timePrev = timeCurrent;
                timeCurrent = Date.now();
            }
            const shiftUserPixels = Math.floor((timeCurrent - timePrev) / 25);
            setClientCoordinates(Object.assign(Object.assign({}, clientData), { shiftUserPixels }));
        }, 75);
    });
    socket.on("clientStopMove", (data) => {
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
