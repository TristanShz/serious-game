import { TMongooseId } from "../../../../_common/_types/MongooseTypes";
import mongoose from "mongoose";
import { AnswerSchema } from "./answers/AnswerModel";


export interface IQuestionModel {
  text: string;
  answers: [TMongooseId];
}

export interface IQuestionDocument extends IQuestionModel, mongoose.Document {
}

export const QuestionSchema = new mongoose.Schema<IQuestionDocument>({
  text: { type: String, trim: true },
  answers: [{ type: AnswerSchema }]
});

