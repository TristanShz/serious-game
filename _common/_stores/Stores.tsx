import { __SERVER__ } from "../_utils/coreUtils";
import { MenuStore } from "../../resources/layouts/header/_stores/MenuStore";
import { createContext, PropsWithChildren, useContext } from "react";
import { CategoriesStore } from "../../resources/formations/categories/_stores/categoriesStore";

type TStores = {
    menuStore: MenuStore;
    categoriesStore: CategoriesStore;
};

export type TStoresInitialData = {};

let clientSideStores: TStores;

export function getStores(initialData: TStoresInitialData = { storesInitialData: {} }) {
    if (__SERVER__) {
        return {
            menuStore: new MenuStore(),
            categoriesStore: new CategoriesStore(),
        };
    }
    if (!clientSideStores) {
        clientSideStores = {
            menuStore: new MenuStore(),
            categoriesStore: new CategoriesStore(),
        };
    }

    return clientSideStores;
}

const StoreContext = createContext({} as TStores);

export function StoreProvider(props: PropsWithChildren<{ value: TStores }>) {
    return <StoreContext.Provider value={props.value}>{props.children}</StoreContext.Provider>;
}

export function useMobxStores() {
    return useContext(StoreContext);
}
