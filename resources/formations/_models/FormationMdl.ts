import { TMongooseId } from "../../../_common/_types/MongooseTypes";
import { TEntryLevel } from "../../../lib/formations/FormationModel";
import { TQuizzMdl } from "../../quizz/_models/QuizzMdl";

export type TFormationBaseMdl = {
  _id: TMongooseId;
  category: TMongooseId;
  title: string;
  alias: string;
  description: string;
  entryLevel: TEntryLevel;
  regionSupport: boolean;
  image?: string;
  quizz?: TMongooseId[]
};

export type TFormationMdl = TFormationBaseMdl & {
  quizz?: TQuizzMdl[]
}
