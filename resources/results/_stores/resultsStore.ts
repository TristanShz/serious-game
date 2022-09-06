import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { TResultBaseMdl, TResultMdl } from "../../quizz/_models/QuizzMdl";
import httpClient from "../../../_config/axios";

class ResultsStore extends ApiPublicStore<TResultMdl> {
    constructor() {
        super("results");
    }

    postResult(data: TResultBaseMdl) {
        return httpClient
            .post<TResultMdl>(`${this.apiPath}`, {
                ...data,
            })
            .then(({ data }) => data);
    }
}

export const resultsStore = new ResultsStore();
