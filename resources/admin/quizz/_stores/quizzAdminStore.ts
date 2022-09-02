import { ApiStore } from "../../../../_common/_stores/ApiStore";
import { TQuizzMdl } from "../../../quizz/_models/QuizzMdl";

export class QuizzAdminStore extends ApiStore<TQuizzMdl> {
    constructor() {
        super("quizz");
    }
}

export const quizzAdminStore = new QuizzAdminStore();
