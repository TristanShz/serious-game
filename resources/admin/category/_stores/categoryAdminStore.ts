import { ApiStore } from "../../../../_common/_stores/ApiStore";
import { TUser } from "../../../users/_models/UserMdl";
import { TFormationMdl } from "../../../formations/_models/FormationMdl";
import { TCategoryMdl } from "../../../formations/categories/_model/CategoryMdl";

class CategoryAdminStore extends ApiStore<TCategoryMdl> {
    constructor() {
        super("category");
    }
}

export const categoryAdminStore = new CategoryAdminStore();
