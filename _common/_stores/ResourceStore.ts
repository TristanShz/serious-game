import { TObjWithId } from "../_types/baseType";

export interface IResourceStore<T extends TObjWithId> {
    listEndPoint(
        offset: number | undefined,
        limit: number | undefined,
        sort: object | undefined,
        filters: object | undefined,
        lan: string | undefined,
    ): string;

    list(
        offset: number | undefined,
        limit: number | undefined,
        sort: object | undefined,
        filters: object | undefined,
    ): Promise<{ count: number; items: T[] }>;

    getEndPoint(itemId: string): string;

    get(itemId: string, force?: boolean): Promise<T | undefined>;
}
