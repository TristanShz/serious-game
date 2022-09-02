import { apiHandler } from "../../../../../lib/middlewares/apiHandler";
import { formationsCtrl } from "../../../../../lib/formations/FormationsCtrl";

export default apiHandler({
<<<<<<< HEAD
    get: formationsCtrl.list,
    post: formationsCtrl.create,
=======
  get: formationsCtrl.list,
  post: formationsCtrl.create
>>>>>>> 20ca28e96f8fcedb81210d610cfded76021662ee
});
