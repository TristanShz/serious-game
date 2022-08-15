import { apiHandler } from "../../../../../lib/middlewares/apiHandler";
import { formationsCtrl } from "../../../../../lib/formations/FormationsCtrl";
import { categoryCtrl } from "../../../../../lib/categories/CategoryCtrl";

export default apiHandler({
    get: categoryCtrl.get,
    patch: categoryCtrl.update,
});
