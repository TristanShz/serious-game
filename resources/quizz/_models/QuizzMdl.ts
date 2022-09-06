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

export type TQuizzWithoutQuestions = Omit<TQuizzBaseMdl, "questions">;

export type TQuizzMdl = TQuizzBaseMdl & {
    question: TQuestionMdl[];
};

export type TQuestionBaseMdl = {
    _id: string;
    text: string;
    answers: {
        a: TAnswerBaseMdl;
        b: TAnswerBaseMdl;
        c: TAnswerBaseMdl;
        d: TAnswerBaseMdl;
    };
};

export type TQuestionMdl = TQuestionBaseMdl & {
    answers: {
        a: TAnswerMdl;
        b: TAnswerMdl;
        c: TAnswerMdl;
        d: TAnswerMdl;
    };
};

export type TAnswerBaseMdl = {
    _id: string;
    text: string;
};
export type TAnswerMdl = TAnswerBaseMdl & {
    isTrue: boolean;
};

export type TResultBaseMdl = {
    user: TMongooseId;
    quizz: TMongooseId;
    responses: { question: Partial<TQuestionMdl>; userResponse: { a: boolean; b: boolean; c: boolean; d: boolean } }[];
    rates: boolean[];
};
