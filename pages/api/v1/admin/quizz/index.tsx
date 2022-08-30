import { apiHandler } from "../../../../../lib/middlewares/apiHandler";
import { quizzCrtl } from "../../../../../lib/formations/quizz/QuizzCtrl";

export default apiHandler({
  get: quizzCrtl.list,
  post: quizzCrtl.create,
  put: quizzCrtl.update
});
