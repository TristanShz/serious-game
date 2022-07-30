import { __SERVER__ } from "../_utils/coreUtils";
import { MenuStore } from "../../resources/layouts/header/_stores/MenuStore";
import { createContext, PropsWithChildren, useContext } from "react";

type TStores = {
    menuStore: MenuStore;
};

export type TStoresInitialData = {};

let clientSideStores: TStores;

export function getStores(initialData: TStoresInitialData = { storesInitialData: {} }) {
    if (__SERVER__) {
        return {
            menuStore: new MenuStore(),
        };
    }
    if (!clientSideStores) {
        clientSideStores = {
            menuStore: new MenuStore(),
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
