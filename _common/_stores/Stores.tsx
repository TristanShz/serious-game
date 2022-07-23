import { __SERVER__ } from "../utils/coreUtils";
import { MenuStore } from "../../resources/layouts/header/_stores/MenuStore";
import { UiStore } from "./UiStore";
import { createContext, PropsWithChildren, useContext } from "react";

type TStores = {
  uiStore: UiStore;
  menuStore: MenuStore;
};

export type TStoresInitialData = {};

let clientSideStores: TStores;

export function getStores(
  initialData: TStoresInitialData = { storesInitialData: {} }
) {
  if (__SERVER__) {
    return {
      uiStore: new UiStore(),
      menuStore: new MenuStore(),
    };
  }
  if (!clientSideStores) {
    clientSideStores = {
      uiStore: new UiStore(),
      menuStore: new MenuStore(),
    };
  }

  return clientSideStores;
}

const StoreContext = createContext({} as TStores);

export function StoreProvider(props: PropsWithChildren<{ value: TStores }>) {
  return (
    <StoreContext.Provider value={props.value}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useMobxStores() {
  return useContext(StoreContext);
}
