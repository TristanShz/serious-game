import { apiHandler } from "../../../../../../lib/middlewares/apiHandler";
import { categoryCtrl } from "../../../../../../lib/categories/CategoryCtrl";

export default apiHandler({
    post: categoryCtrl.create,
});
