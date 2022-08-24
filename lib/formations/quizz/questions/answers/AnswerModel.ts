import mongoose from "mongoose";


export interface IAnswerModel {
  text: string;
  isTrue: boolean;
}

export interface IAnswerDocument extends IAnswerModel, mongoose.Document {
}

export const AnswerSchema = new mongoose.Schema<IAnswerDocument>({
  text: { type: String, trim: true },
  isTrue: { type: Boolean, select: false }
});

export default mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);
