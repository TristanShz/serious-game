import { apiHandler } from "../../../../lib/middlewares/apiHandler";
import authCtrl from "../../../../lib/users/auth/authCtrl";

export default apiHandler({
    post: authCtrl.register,
});
