import mongoose, { Schema } from "mongoose";

export interface ICategoryModel {
    _id: Schema.Types.ObjectId;
    blockTitle: string;
    blockDescription: string;
    pageTitle: string;
    pageDescription: string;
}

export interface ICategoryDocument extends Omit<ICategoryModel, "_id">, mongoose.Document {}

const CategorySchema = new mongoose.Schema<ICategoryDocument>({
    blockTitle: { type: String, trim: true, required: true },
    blockDescription: { type: String, trim: true, required: true },
    pageTitle: { type: String, trim: true, required: true },
    pageDescription: { type: String, trim: true, required: true },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
