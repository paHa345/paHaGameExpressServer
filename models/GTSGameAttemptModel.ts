import mongoose from "mongoose";
import { IGTSAttemptSchema } from "../types";

const GTSGameAttemptSchema = new mongoose.Schema<IGTSAttemptSchema>({
  telegramUserName: { type: String, required: false },
  telegramID: { type: Number, required: true },
  startDate: { type: Date, required: true },
  GTSGameID: { type: String, required: true },
  timeRemained: { type: Number, required: true },
  attemptTime: { type: Number, required: true },
  isCompleted: { type: Boolean, required: true },
  currentQuestion: { type: Number, required: true },
  answerTime: { type: Number, required: true },
  attemptQuestionStatus: [
    {
      questionID: { type: String, required: true },
      getAnswer: { type: Boolean, required: true },
      answerIsCorrect: { type: Boolean, required: false },
    },
  ],
});

const GTSGameAttempt =
  mongoose.models.GTSAttempt ||
  mongoose.model<IGTSAttemptSchema>("GTSAttempt", GTSGameAttemptSchema, "GTSAttempts");

export default GTSGameAttempt;
