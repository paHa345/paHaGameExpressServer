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
const express_1 = require("express");
const GTSGameAttemptModel_1 = __importDefault(require("../models/GTSGameAttemptModel"));
const router = (0, express_1.Router)();
router.get("/:attemptID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentGTSGameAttemptTime = yield GTSGameAttemptModel_1.default.findById(req.params.attemptID).select("answerTime");
        if (currentGTSGameAttemptTime === null) {
            throw new Error(`Не найдена попытка: ${req.params.attemptID}`);
        }
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
        // console.log(error);
        res.status(500).send(error.message);
    }
}));
exports.default = router;
