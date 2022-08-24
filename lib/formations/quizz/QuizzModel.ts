import { TMongooseId } from "../../../_common/_types/MongooseTypes";
import mongoose from "mongoose";
import { QuestionSchema } from "./questions/QuestionModel";

export enum TDifficultyLevel {
  "ONE" = 1,
  "TWO" = 2,
  "THREE" = 3,
  "FOUR" = 4,
  "FIVE" = 5
}

export interface IQuizzModel {
  _id?: TMongooseId;
  name: string;
  description: string;
  duration: number;
  difficulty: TDifficultyLevel;
  questions: [TMongooseId];
}

export interface IQuizzDocument extends IQuizzModel, mongoose.Document {
}

const QuizzSchema = new mongoose.Schema<IQuizzDocument>({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  duration: { type: Number },
  difficulty: { type: Number, enum: TDifficultyLevel },
  questions: [{ type: QuestionSchema }]
});

export default mongoose.models.Quizz || mongoose.model("Quizz", QuizzSchema);
