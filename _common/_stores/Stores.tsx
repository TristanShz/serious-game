import { __BROWSER__ } from "../_utils/coreUtils";
import { MenuStore } from "../../resources/layouts/header/_stores/MenuStore";
import { createContext, PropsWithChildren, useContext } from "react";
import { CategoriesStore } from "../../resources/formations/categories/_stores/categoriesStore";
import { ModalStore } from "../../resources/modal/_stores/ModalStore";

type TStores = {
  menuStore: MenuStore;
  categoriesStore: CategoriesStore;
  modalStore: ModalStore
};

export type TStoresInitialData = {};

let clientSideStores: TStores;

export function getStores(initialData: TStoresInitialData = { storesInitialData: {} }) {
  if (!__BROWSER__) {
    return {
      menuStore: new MenuStore(),
      categoriesStore: new CategoriesStore(),
      modalStore: new ModalStore()
    };
  }
  if (!clientSideStores) {
    clientSideStores = {
      menuStore: new MenuStore(),
      categoriesStore: new CategoriesStore(),
      modalStore: new ModalStore()
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
