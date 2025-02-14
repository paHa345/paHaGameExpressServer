"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GTSGameAttemptSchema = new mongoose_1.default.Schema({
    telegramUserName: { type: String, required: false },
    telegramID: { type: Number, required: true },
    startDate: { type: Date, required: true },
    GTSGameID: { type: String, required: true },
    timeRemained: { type: Number, required: true },
    isCompleted: { type: Boolean, required: true },
});
const GTSGameAttempt = mongoose_1.default.models.GTSAttempt ||
    mongoose_1.default.model("GTSAttempt", GTSGameAttemptSchema, "GTSAttempts");
exports.default = GTSGameAttempt;
