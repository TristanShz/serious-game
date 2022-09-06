import mongoose from "mongoose";
import { TMongooseId } from "../../../../_common/_types/MongooseTypes";
import { IQuestionModel, QuestionSchema } from "../questions/QuestionModel";

export const isQuestionModel = (question: IQuestionModel | undefined): question is IQuestionModel => {
    return question !== undefined;
};

export interface IResultsModel {
    user: TMongooseId;
    quizz: TMongooseId;
    responses: {
        question: TMongooseId | IQuestionModel;
        userResponse: { a: boolean; b: boolean; c: boolean; d: boolean };
    }[];
    rates: boolean[];
}

export interface IResultsDocument extends IResultsModel, mongoose.Document {}

export const ResultsSchema = new mongoose.Schema<IResultsDocument>({
    user: { type: String, trim: true },
    quizz: { type: Boolean },
    responses: [
        { question: { type: QuestionSchema }, userResponse: { a: Boolean, b: Boolean, c: Boolean, d: Boolean } },
    ],
    rates: { type: [Boolean] },
});

export const ResultsModel = mongoose.model<IResultsDocument>("Results", ResultsSchema);
