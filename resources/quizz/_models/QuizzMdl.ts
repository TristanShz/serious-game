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

export type TQuizzWithoutQuestions = Omit<TQuizzBaseMdl, "questions">

export type TQuizzMdl = TQuizzBaseMdl & {
  question: TQuestionMdl[];
};

export type TQuestionBaseMdl = {
  text: string
  answers: {
    a: TAnswerBaseMdl,
    b: TAnswerBaseMdl,
    c: TAnswerBaseMdl,
    d: TAnswerBaseMdl,
  }
}

export type TQuestionMdl = TQuestionBaseMdl & {
  answers: {
    a: TAnswerMdl,
    b: TAnswerMdl,
    c: TAnswerMdl,
    d: TAnswerMdl,
  }
};

export type TAnswerBaseMdl = {
  text: string;
};
export type TAnswerMdl = TAnswerBaseMdl & {
  isTrue: boolean
}

export type TResultBaseMdl = {
  user: TMongooseId
  quizz: TMongooseId
  answers: (TQuestionBaseMdl & { answered: boolean })[]
  rates: boolean[]
}
