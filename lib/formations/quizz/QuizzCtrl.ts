import { CrudCtrl } from "../../crud/CrudCtrl";
import { IQuizzDocument, IQuizzModel } from "./QuizzModel";
import quizzService from "./QuizzService";
import { NextApiHandler } from "next";
import { genericCtrlFn } from "../../../_common/_helpers/ctrlHelper";
import { errorsBuilders } from "../../../_common/errors/errorBuilder";
import formationsService from "../FormationsService";

class QuizzCtrl extends CrudCtrl<"quizz", IQuizzModel, IQuizzDocument> {
  constructor() {
    super("quizz", quizzService);
  }
  
  listByFormation: NextApiHandler = async (req, res) => {
    return genericCtrlFn(res, this.ctrlName + ".listByFormation", async () => {
      if (req.query.formationId) {
        const formation = await formationsService.get(req.query.formationId);
        if (formation && formation.quizz) {
          return Promise.all(formation.quizz.map(quizzId => quizzService.get(quizzId)))
            .then((quizzList) => quizzList);
        }
      }
      throw errorsBuilders.quizz.notFound();
    });
  };
}

export const quizzCrtl = new QuizzCtrl();
