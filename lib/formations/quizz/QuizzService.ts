import CrudService from "../../crud/CrudService";
import QuizzModel, { IQuizzDocument, IQuizzModel } from "./QuizzModel";

class QuizzService extends CrudService<"quizz", IQuizzModel, IQuizzDocument> {
  constructor() {
    super("quizz", QuizzModel, false);
  }

}

const quizzService = new QuizzService();
export default quizzService;
