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
const GTSGameAttemptModel_1 = __importDefault(require("../models/GTSGameAttemptModel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
console.log("start");
app.get("/GTSAttempts/:attemptID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
            const currentGTSGameAttemptTime = yield GTSGameAttemptModel_1.default.findById(req.params.attemptID).select("timeRemained");
            const currentTime = JSON.parse(JSON.stringify(currentGTSGameAttemptTime.timeRemained));
            const updatedGTSGameAttempt = yield GTSGameAttemptModel_1.default.findByIdAndUpdate(req.params.attemptID, {
                $set: { timeRemained: currentTime - 1 },
            }, {
                new: true,
            });
            res.write(`attemptTimeRemained: ${JSON.stringify(updatedGTSGameAttempt.timeRemained)}\n\n`);
        });
        const intervalID = setInterval(sendData, 1000);
        req.on("close", () => {
            res.write(`stopAttempt: ${true}\n\n`);
            console.log("client disconnected");
            clearInterval(intervalID); // очистка интервала отправки данных
            res.end();
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}));
app.get("/answerTime/:attemptID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            "Content-Type": "text/event-stream",
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
        };
        res.writeHead(200, headers);
        const decrementAnswerTime = () => __awaiter(void 0, void 0, void 0, function* () {
            const currentGTSGameAttemptTime = yield GTSGameAttemptModel_1.default.findById(req.params.attemptID).select("answerTime");
            const currentAnswerTime = JSON.parse(JSON.stringify(currentGTSGameAttemptTime.answerTime));
            if (currentAnswerTime <= 0) {
                const updatedGTSGameAttempt = yield GTSGameAttemptModel_1.default.findByIdAndUpdate(req.params.attemptID, {
                    $set: { answerTime: 0 },
                }, {
                    new: true,
                });
                res.write(`timesUp: ${true}\n\n`);
                console.log("timesUp");
                clearInterval(intervalID);
                res.end();
                return;
            }
            const updatedGTSGameAttempt = yield GTSGameAttemptModel_1.default.findByIdAndUpdate(req.params.attemptID, {
                $set: { answerTime: currentAnswerTime - 1 },
            }, {
                new: true,
            });
            res.write(`answerTimeRemained: ${JSON.stringify(updatedGTSGameAttempt.answerTime)}\n\n`);
        });
        const intervalID = setInterval(decrementAnswerTime, 1000);
        req.on("close", () => {
            res.write(`stopAttempt: ${true}\n\n`);
            console.log("client disconnected");
            clearInterval(intervalID); // очистка интервала отправки данных
            res.end();
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, MongoConnect_1.connectMongoDB)();
        console.log(`[server]: Server is running at http://localhost:${port} and connect to database`);
    }
    catch (error) {
        console.log(error);
    }
}));
