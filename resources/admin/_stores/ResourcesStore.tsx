import { action, makeObservable, observable } from "mobx";
import { ApiStore } from "../../../_common/_stores/ApiStore";
import { TObjWithId } from "../../../_common/_types/baseType";

export class ResourcesStore<T extends TObjWithId> {
    readonly storeName: string;
    private store: ApiStore<T> | undefined;
    @observable items: T[] = [];
    @observable count = 0;

    constructor(storeName = "", items?: T[], private providerStore?: ApiStore<T>, count = 0) {
        this.storeName = storeName;
        this.items = items ?? [];
        this.store = providerStore;
        this.count = count;
        makeObservable(this);
    }

    @action onDelete(itemId: string | number) {
        this.store
            ?.delete(itemId)
            .then((_response) => {
                this.load();
            })
            .catch((error) => console.log(error));
    }

    @action load() {
        return this.providerStore?.list().then(
            action((response) => {
                console.log("dans le load", response);
                this.items = response.items;
                this.count = response.count;
            }),
        );
    }
}
