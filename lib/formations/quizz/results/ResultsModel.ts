import mongoose from "mongoose";
import { TMongooseId } from "../../../../_common/_types/MongooseTypes";
import { IQuestionModel, QuestionSchema } from "../questions/QuestionModel";
import UserModel from "../../../users/UserModel";
import QuizzModel from "../QuizzModel";

export interface IResultsBaseModel {
    user: TMongooseId;
    quizz: TMongooseId;
    responses: {
        question: TMongooseId;
        userResponse: { a: boolean; b: boolean; c: boolean; d: boolean };
    }[];
}

export interface IResultsModel {
    user: TMongooseId;
    quizz: TMongooseId;
    responses: {
        question: IQuestionModel;
        userResponse: { a: boolean; b: boolean; c: boolean; d: boolean };
    }[];
}

export interface IResultsDocument extends IResultsModel, mongoose.Document {}

export const ResultsSchema = new mongoose.Schema<IResultsDocument>({
    user: { type: mongoose.Types.ObjectId, ref: UserModel },
    quizz: { type: mongoose.Types.ObjectId, ref: QuizzModel },
    responses: [
        { question: { type: QuestionSchema }, userResponse: { a: Boolean, b: Boolean, c: Boolean, d: Boolean } },
    ],
});

export default mongoose.models.Results || mongoose.model("Results", ResultsSchema);
