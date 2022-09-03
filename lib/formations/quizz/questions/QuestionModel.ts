import mongoose from "mongoose";
import { AnswerSchema, IAnswerModel } from "./answers/AnswerModel";

export interface IQuestionModel {
  text: string;
  answers: {
    a: IAnswerModel,
    b: IAnswerModel,
    c: IAnswerModel,
    d: IAnswerModel
  };
}

export interface IQuestionDocument extends IQuestionModel, mongoose.Document {
}

export const QuestionSchema = new mongoose.Schema<IQuestionDocument>({
  text: { type: String, trim: true },
  answers: {
    a: { type: AnswerSchema },
    b: { type: AnswerSchema },
    c: { type: AnswerSchema },
    d: { type: AnswerSchema }
  }
});
