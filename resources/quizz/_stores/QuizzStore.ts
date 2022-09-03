import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { TQuizzBaseMdl, TQuizzWithoutQuestions } from "../_models/QuizzMdl";
import httpClient from "../../../_config/axios";

export class QuizzStore extends ApiPublicStore<TQuizzBaseMdl> {
  constructor() {
    super("quizz");
  }

  getOne(quizzId: string): Promise<TQuizzBaseMdl | undefined> {
    return httpClient.get<TQuizzBaseMdl>(`${this.apiPath}/${quizzId}`).then(({ data }) => data);
  }

  quizzListByFormation(formationId: string) {
    const promise = httpClient
      .get<TQuizzWithoutQuestions[]>(`${this.apiPath}/list/${formationId}`)
      .then(({ data }) => {
        return data;
      });
    return promise;
  }

}

export const quizzStore = new QuizzStore();
