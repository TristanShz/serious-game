import mongoose from "mongoose";
import { IQuestionModel, QuestionSchema } from "../questions/QuestionModel";
import { TMongooseId } from "../../../../_common/_types/MongooseTypes";

export interface IResultsModel {
    user: TMongooseId;
    quizz: TMongooseId;
    answers: (IQuestionModel & { answered: boolean })[];
    rates: boolean[];
}

export interface IResultsDocument extends IResultsModel, mongoose.Document {}

export const ResultsShema = new mongoose.Schema<IResultsDocument>({
    user: { type: String, trim: true },
    quizz: { type: Boolean, select: false },
    answers: [{ type: [QuestionSchema, { answered: Boolean }], select: false }],
    rates: { type: [Boolean], select: false },
});

export const ResultsModel = mongoose.model<IResultsDocument>("Results", ResultsShema);
