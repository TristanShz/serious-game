import mongoose, { Types } from "mongoose";
import { ElementType } from "react";
import CategoryModel from "../categories/CategoryModel";
import { TMongooseId } from "../../_common/_types/MongooseTypes";

export const ENTRY_LEVELS: [0, 1, 2, 3] = [0, 1, 2, 3];
export type TEntryLevel = ElementType<typeof ENTRY_LEVELS>;

export interface IFormationModel {
    _id?: TMongooseId;
    category: TMongooseId;
    title: string;
    alias: string;
    description: string;
    entryLevel: TEntryLevel;
    regionSupport: boolean;
    image?: string;
}

export interface IFormationDocument extends Omit<IFormationModel, "_id">, mongoose.Document {}

const FormationSchema = new mongoose.Schema<IFormationDocument>({
    category: { type: Types.ObjectId, ref: CategoryModel, required: true },
    title: { type: String, trim: true },
    alias: { type: String, trim: true },
    description: { type: String, trim: true },
    entryLevel: { type: Number, enum: ENTRY_LEVELS },
    regionSupport: { type: Boolean },
    image: { type: String, trim: true },
});

export default mongoose.models.Formation || mongoose.model("Formation", FormationSchema);
