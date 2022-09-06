import mongoose from "mongoose";
import { AnswerSchema, IAnswerModel } from "./answers/AnswerModel";
import { TMongooseId } from "../../../../_common/_types/MongooseTypes";

export interface IQuestionModel {
    _id?: TMongooseId;
    text: string;
    answers: {
        a: IAnswerModel;
        b: IAnswerModel;
        c: IAnswerModel;
        d: IAnswerModel;
    };
}

export interface IQuestionDocument extends IQuestionModel, mongoose.Document {}

export const QuestionSchema = new mongoose.Schema<IQuestionDocument>({
    text: { type: String, trim: true },
    answers: {
        a: { type: AnswerSchema },
        b: { type: AnswerSchema },
        c: { type: AnswerSchema },
        d: { type: AnswerSchema },
    },
});
