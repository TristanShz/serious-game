import { TMongooseId } from "../../../_common/_types/MongooseTypes";
import { TDifficultyLevel } from "../../../lib/formations/quizz/QuizzModel";

export type TQuizzBaseMdl = {
  _id: TMongooseId;
  name: string;
  description: string;
  duration: number;
  difficulty: TDifficultyLevel;
  questions: TQuestionBaseMdl[]
}

export type TQuizzMdl = TQuizzBaseMdl & {
  question: TQuestionMdl[]
}

export type TQuestionBaseMdl = {
  text: string
  answers: TAnswerBaseMdl
}
export type TQuestionMdl = TQuestionBaseMdl & {
  answers: TAnswerMdl[]
}

export type TAnswerBaseMdl = {
  text: string
}
export type TAnswerMdl = TAnswerBaseMdl & {
  isTrue: boolean
}
