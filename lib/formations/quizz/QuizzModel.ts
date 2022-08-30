import { TMongooseId } from "../../../_common/_types/MongooseTypes";
import mongoose from "mongoose";
import { QuestionSchema } from "./questions/QuestionModel";
import { QUIZZ_DIFFICULTY_LEVEL, TQuizzDifficultyLevel } from "../../../_config/config";

export interface IQuizzModel {
  _id?: TMongooseId;
  name: string;
  description: string;
  duration: number;
  difficulty: TQuizzDifficultyLevel;
  questions: [TMongooseId];
}

export interface IQuizzDocument extends IQuizzModel, mongoose.Document {
}

const QuizzSchema = new mongoose.Schema<IQuizzDocument>({
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  duration: { type: Number },
  difficulty: { type: Number, enum: QUIZZ_DIFFICULTY_LEVEL },
  questions: [{ type: QuestionSchema }]
});

export default mongoose.models.Quizz || mongoose.model("Quizz", QuizzSchema);
