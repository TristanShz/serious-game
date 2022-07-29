import { createContext, FC, PropsWithChildren, useContext } from "react";
import { UserStore } from "./UserStore";

const UserCtx = createContext(new UserStore());

const UserProvider: FC<{ store: UserStore; children: PropsWithChildren<any> }> = ({ store, children }) => {
    return <UserCtx.Provider value={store}>{children}</UserCtx.Provider>;
};

const useUserStore = () => {
    return useContext(UserCtx);
};

export { UserProvider, useUserStore };
