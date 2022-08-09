import { fetcher } from "../../../_config/axios";
import { ReactNode } from "react";
import { AxiosResponse } from "axios";
import useSWR from "swr";

type Props<T> = {
    render: (data: AxiosResponse<T> | undefined, error: any) => ReactNode;
    renderError?: (error: any) => ReactNode;
    endPoint: string;
};

export function ComponentLoader<T>(props: Props<T>) {
    const { data, error } = useSWR([props.endPoint], fetcher, {
        fallbackData: { data: undefined } as AxiosResponse,
        revalidateOnFocus: false,
    });

    const isLoading = !data?.data && !error;
    if (isLoading) return <div>CA CHARGE</div>;
    if (error && props.renderError) return <>{props.renderError(error)}</>;
    else if (error && !props.renderError) return <div>Y A UNE ERREUR</div>;
    return <>{props.render(data, error)}</>;
}
