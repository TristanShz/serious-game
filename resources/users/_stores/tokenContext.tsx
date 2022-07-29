import React, { createContext, FC, PropsWithChildren, useContext } from "react";
import { TokenStore } from "./tokenStore";

const TokenCtx = createContext(new TokenStore());

const TokenProvider: FC<{ store: TokenStore; children: PropsWithChildren<any> }> = ({ store, children }) => {
    return <TokenCtx.Provider value={store}>{children}</TokenCtx.Provider>;
};

const useTokenStore = () => {
    return useContext(TokenCtx);
};

export { TokenProvider, useTokenStore };
