import { TMongooseId } from "../../../_common/_types/MongooseTypes";
import { TEntryLevel } from "../../../lib/formations/FormationModel";

export type TFormationMdl = {
    _id: TMongooseId;
    category: TMongooseId;
    title: string;
    alias: string;
    description: string;
    entryLevel: TEntryLevel;
    regionSupport: boolean;
    image?: string;
};
