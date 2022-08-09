import { ApiPublicStore } from "../../../_common/_stores/ApiPublicStore";
import { TFormationMdl } from "../_models/FormationMdl";
import { TFilter } from "../../../_common/_types/filterTypes";
import httpClient from "../../../_config/axios";

export class FormationsStore extends ApiPublicStore<TFormationMdl> {
    constructor() {
        super("formations");
    }

    listing(
        categoryAlias: string,
        offset: number = 0,
        limit?: number,
        sort?: { [p: string]: number },
        filters?: TFilter[],
    ): Promise<{ count: number; items: TFormationMdl[] }> {
        const promise = httpClient
            .get<{ count: number; items: TFormationMdl[] }>(
                this.customEndPoint(`/${categoryAlias}`, offset, limit, sort, filters),
            )
            .then(({ data: { count, items } }) => {
                this.setItems(items);
                return {
                    count,
                    items,
                };
            });
        return promise;
    }
}

export const formationsStore = new FormationsStore();
