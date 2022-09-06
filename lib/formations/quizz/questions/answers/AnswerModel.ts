import mongoose from "mongoose";
import { TMongooseId } from "../../../../../_common/_types/MongooseTypes";

export interface IAnswerModel {
    _id?: TMongooseId;
    text: string;
    isTrue: boolean;
}

export interface IAnswerDocument extends IAnswerModel, mongoose.Document {}

export const AnswerSchema = new mongoose.Schema<IAnswerDocument>({
    text: { type: String, trim: true },
    isTrue: { type: Boolean },
});
