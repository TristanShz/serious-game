import { apiHandler } from "../../../../lib/middlewares/apiHandler";
import { QuizzCrtl } from "../../../../lib/formations/quizz/QuizzCtrl";

export default apiHandler({
  get: QuizzCrtl.get
});
