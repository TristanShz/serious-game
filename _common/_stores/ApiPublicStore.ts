import httpClient, { fetchUtils } from "../../_config/axios";
import { TFilter } from "../_types/filterTypes";
import { TObjWithId } from "../_types/baseType";
import { TFilesData } from "../utils/fileUtils";
import { tokenStore } from "../../resources/users/_stores/tokenStore";
import { ApiStore } from "./ApiStore";
import { makeObservable } from "mobx";

export abstract class ApiPublicStore<TResource extends TObjWithId> extends ApiStore<TResource> {
    protected constructor(protected serviceName: string) {
        super(serviceName);
        makeObservable(this);
    }

    list(
        offset: number = 0,
        limit?: number,
        sort?: { [p: string]: number },
        filters?: TFilter[],
    ): Promise<{ count: any; items: any }> {
        const promise = httpClient
            .get<{ count: number; items: TResource[] }>(this.customEndPoint("/listing", offset, limit, sort, filters), {
                headers: {
                    Authorization: `Bearer ${tokenStore.token ?? ""}`,
                },
            })
            .then(({ data: { count, items } }) => {
                this.setItems(items);
                return {
                    count,
                    items,
                };
            });
        return promise;
    }

    update(data: Partial<TResource>, files?: TFilesData): Promise<TResource | undefined> {
        const _data = files ? fetchUtils.createBodyWithFiles(data, files) : data;
        return httpClient
            .patch<TResource>(`${this.apiPath}/update/${data._id}`, _data, {
                headers: {
                    Authorization: `Bearer ${tokenStore.token ?? ""}`,
                },
            })
            .then(({ data }) => data);
    }

    new(item: Partial<TResource>) {
        return httpClient.post<TResource>(`${this.apiPath}/new`, item, {
            headers: {
                Authorization: `Bearer ${tokenStore.token ?? ""}`,
            },
        });
    }

    getEndPoint(itemId: string): string {
        return `${this.apiPath}/one/${itemId}`;
    }
}
