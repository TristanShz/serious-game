import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { TCategoryMdl } from "../_model/CategoryMdl";
import httpClient from "../../../_config/axios";
import { tokenStore } from "../../users/_stores/tokenStore";

export class CategoriesStore extends ApiPublicStore<TCategoryMdl> {
    constructor() {
        super("category");
    }

    getOneByAlias(alias: string) {
        return httpClient.get<TCategoryMdl>(`category/${alias}`, {
            headers: {
                Authorization: `Bearer ${tokenStore.token ?? ""}`,
            },
        });
    }
}

export const categoriesStore = new CategoriesStore();
