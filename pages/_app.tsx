import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { getStores, StoreProvider, TStoresInitialData } from "../_common/_stores/Stores";
import { userStore } from "../resources/users/_stores/UserStore";
import { UserProvider } from "../resources/users/_stores/UserContext";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    initialData: TStoresInitialData;
};

function MyApp({ Component, pageProps, initialData }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);
    const stores = getStores();
    return (
        <UserProvider store={userStore}>
            <StoreProvider value={stores}>{getLayout(<Component {...pageProps} />)}</StoreProvider>
        </UserProvider>
    );
}

App.getInitialProps = async (appContext) => {
    // Call "super" to run page's `getInitialProps`
    const appProps = await App.getInitialProps(appContext);
    // Gather serialization-friendly data from stores
    const initialData = {};

    // Send it to `render`
    return {
        ...appProps,
        initialData,
    };
};

export default MyApp;
