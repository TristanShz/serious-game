import { apiHandler } from "../../../../../lib/middlewares/apiHandler";
import { usersCtrl } from "../../../../../lib/users/UsersCtrl";

export default apiHandler({
    get: usersCtrl.list,
});
