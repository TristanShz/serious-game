import { TMongooseId } from "../../../../_common/_types/MongooseTypes";

export type TCategoryMdl = {
    _id: TMongooseId;
    urlAlias: string;
    imageUrl: string;
    blockTitle: string;
    blockDescription: string;
    pageTitle: string;
    pageDescription: string;
};
