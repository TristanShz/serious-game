import { ApiPublicStore } from "../../../../_common/_stores/ApiPublicStore";
import { TCategoryMdl } from "../_model/CategoryMdl";
import httpClient from "../../../../_config/axios";

export class CategoriesStore extends ApiPublicStore<TCategoryMdl> {
    constructor() {
        super("category");
    }

    getOneByAlias(alias: string) {
        return httpClient.get<TCategoryMdl>(`category/${alias}`);
    }
}

export const categoriesStore = new CategoriesStore();
