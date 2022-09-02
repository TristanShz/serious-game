import { apiHandler } from "../../../../../lib/middlewares/apiHandler";
import { formationsCtrl } from "../../../../../lib/formations/FormationsCtrl";

export default apiHandler({
    get: formationsCtrl.list,
    post: formationsCtrl.create,
});
