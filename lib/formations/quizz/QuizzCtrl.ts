import { CrudCtrl } from "../../crud/CrudCtrl";
import { IQuizzDocument, IQuizzModel } from "./QuizzModel";
import quizzService from "./QuizzService";

class QuizzCtrl extends CrudCtrl<"quizz", IQuizzModel, IQuizzDocument> {
  constructor() {
    super("quizz", quizzService);
  }

}

export const quizzCrtl = new QuizzCtrl();
