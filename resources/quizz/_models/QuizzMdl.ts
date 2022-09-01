import { TMongooseId } from "../../../_common/_types/MongooseTypes";
import { TQuizzDifficultyLevel } from "../../../_config/config";

export type TQuizzBaseMdl = {
    _id: TMongooseId;
    name: string;
    description: string;
    duration: number;
    difficulty: TQuizzDifficultyLevel;
    questions: TQuestionBaseMdl[];
};

export type TQuizzMdl = TQuizzBaseMdl & {
    question: TQuestionMdl[];
};

export type TQuestionBaseMdl = {
    text: string;
    answers: TAnswerBaseMdl;
};
export type TQuestionMdl = TQuestionBaseMdl & {
    answers: TAnswerMdl[];
};

export type TAnswerBaseMdl = {
    text: string;
};
export type TAnswerMdl = TAnswerBaseMdl & {
    isTrue: boolean;
};
