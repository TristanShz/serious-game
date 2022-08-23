import httpClient from "../../_config/axios";
import { IResourceStore } from "./ResourceStore";
import { appConfig } from "../../_config/config";
import { TFilter } from "../_types/filterTypes";
import { TObjWithId } from "../_types/baseType";
import { TFilesData } from "../_utils/fileUtils";
import { action, makeObservable, observable } from "mobx";

export abstract class ApiStore<TResource extends TObjWithId> implements IResourceStore<TResource> {
  @observable items: TResource[] = [];
  apiPath: string;

  protected constructor(protected serviceName: string) {
    this.apiPath = `${appConfig.apiUrl}/admin/${this.serviceName}`;
    makeObservable(this);
  }

  listEndPoint(offset = 0, limit?: number, sort?: { [key: string]: number }, filters?: TFilter[]) {
    const sortParam = sort ? `&sort=${JSON.stringify(sort)}` : "";
    let filtersParam = "";
    let limitParam = "";
    if (filters) filtersParam = filters.length > 0 ? `&filters=${JSON.stringify(filters)}` : "";
    if (limit) limitParam = `&limit=${limit}`;
    return `${this.apiPath}?offset=${offset}${limitParam}${sortParam}${filtersParam}`;
  }

  customEndPoint(
    customPath: string,
    offset = 0,
    limit?: number,
    sort?: { [key: string]: number },
    filters?: TFilter[]
  ) {
    const sortParam = sort ? `&sort=${JSON.stringify(sort)}` : "";
    let filtersParam = "";
    let limitParam = "";

    if (filters) filtersParam = filters.length > 0 ? `&filters=${JSON.stringify(filters)}` : "";
    if (limit) limitParam = `&limit=${limit}`;

    return `${this.apiPath}${customPath}?offset=${offset}${limitParam}${sortParam}${filtersParam}`;
  }

  list(offset = 0, limit?: number, sort?: { [key: string]: number }, filters?: TFilter[]) {
    const promise = httpClient
      .get<{ count: number; items: TResource[] }>(this.listEndPoint(offset, limit, sort, filters))
      .then(({ data: { count, items } }) => {
        this.setItems(items);
        return {
          count,
          items
        };
      });
    return promise;
  }

  getEndPoint(itemId: string) {
    return `${this.apiPath}/${itemId}`;
  }

  get(itemId: string): Promise<TResource | undefined> {
    return httpClient.get<TResource>(this.getEndPoint(itemId)).then(({ data }) => data);
  }

  delete(itemId: string | number): Promise<TResource | undefined> {
    return httpClient.delete<TResource>(`${this.apiPath}/${itemId}`).then(({ data }) => data);
  }

  update(data: Partial<TResource>, files?: TFilesData): Promise<TResource | undefined> {
    return httpClient.patch<TResource>(`${this.apiPath}/${data._id}`, data).then(({ data }) => data);
  }

  create(data: any): Promise<TResource | undefined> {
    return httpClient
      .post<TResource>(`${this.apiPath}/new`, {
        ...data
      })
      .then(({ data }) => data);
  }

  @action
  setItems(items: TResource[]) {
    this.items = items;
  }
}
