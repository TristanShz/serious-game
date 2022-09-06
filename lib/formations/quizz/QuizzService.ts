import CrudService from "../../crud/CrudService";
import QuizzModel, { IQuizzDocument, IQuizzModel } from "./QuizzModel";

class QuizzService extends CrudService<"quizz", IQuizzModel, IQuizzDocument> {
    constructor() {
        super("quizz", QuizzModel, false);
    }
}

export const quizzService = new QuizzService();
