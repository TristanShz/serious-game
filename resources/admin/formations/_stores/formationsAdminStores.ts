import { ApiStore } from "../../../../_common/_stores/ApiStore";
import { TUser } from "../../../users/_models/UserMdl";
import { TFormationMdl } from "../../../formations/_models/FormationMdl";

class FormationsAdminStore extends ApiStore<TFormationMdl> {
    constructor() {
        super("formations");
    }
}

export const formationsAdminStore = new FormationsAdminStore();
