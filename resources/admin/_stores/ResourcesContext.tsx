import { ResourcesStore } from "./ResourcesStore";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const ResourcesCtx = createContext(new ResourcesStore());

const ResourcesProvider: FC<{ store: ResourcesStore<any>; children: PropsWithChildren<any> }> = ({
                                                                                                   store,
                                                                                                   children
                                                                                                 }) => {
  return <ResourcesCtx.Provider value={store}>{children}</ResourcesCtx.Provider>;
};

const useResourcesStore = () => useContext(ResourcesCtx);

export { ResourcesProvider, useResourcesStore };
