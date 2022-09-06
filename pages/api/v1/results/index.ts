import { apiHandler } from "../../../../lib/middlewares/apiHandler";
import { resultsCtrl } from "../../../../lib/formations/quizz/results/ResultsCtrl";

export default apiHandler({
    post: resultsCtrl.postResult,
});
