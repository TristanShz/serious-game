import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { TQuizzWithoutQuestions } from "../_models/QuizzMdl";
import httpClient from "../../../_config/axios";

export class QuizzStore extends ApiPublicStore<TQuizzWithoutQuestions> {
  constructor() {
    super("quizz");
  }

  quizzListByFormation(formationId: string) {
    const promise = httpClient
      .get<TQuizzWithoutQuestions[]>(`${this.apiPath}/${formationId}`)
      .then(({ data }) => {
        this.setItems(data);
        return data;
      });
    return promise;
  }
}

export const quizzStore = new QuizzStore();
