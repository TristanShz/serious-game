import mongoose from "mongoose";
import { AnswerSchema, IAnswerModel } from "./answers/AnswerModel";

export interface IQuestionModel {
    text: string;
    answers: IAnswerModel[];
}

export interface IQuestionDocument extends IQuestionModel, mongoose.Document {}

export const QuestionSchema = new mongoose.Schema<IQuestionDocument>({
    text: { type: String, trim: true },
    answers: [{ type: AnswerSchema }],
});
