import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { TQuizzMdl } from "../_models/QuizzMdl";

export class QuizzStore extends ApiPublicStore<TQuizzMdl> {
  constructor() {
    super("quizz");
  }
}

export const quizzStore = new QuizzStore();
