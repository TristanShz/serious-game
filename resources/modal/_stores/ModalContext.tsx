import { modalStore, ModalStore } from "./ModalStore";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const ModalCtx = createContext(new ModalStore());

const ModalProvider: FC<{ store: typeof modalStore; children: PropsWithChildren<any> }> = ({ store, children }) => {
  return <ModalCtx.Provider value={store}>{children}</ModalCtx.Provider>;
};

const useModalStore = () => {
  return useContext(ModalCtx);
};

export { ModalProvider, useModalStore };
