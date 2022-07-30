import mongoose from "mongoose";

export enum USER_ROLES {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface IUserModel {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: USER_ROLES;
}

export interface IUserDocument extends Omit<IUserModel, "_id">, mongoose.Document {}

const UserSchema = new mongoose.Schema<IUserModel>({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true, minLength: 8, select: false },
    role: { type: String, enum: Object.values(USER_ROLES), required: true },
});

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
