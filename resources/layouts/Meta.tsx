import React from "react";
import Head from "next/head";

type Props = {
    title?: string;
    description?: string;
    url: string;
    canonical?: string;
};

export function Meta(props: Props) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />

            <meta name="title" content={props.title} />
            <meta name="og:title" content={props.title} />
            <meta name="twitter:title" content={props.title} />

            <meta name="description" content={props.description} />
            <meta name="og:description" content={props.description} />
            <meta name="twitter:description" content={props.description} />

            <meta name="twitter:card" content="summary" />
            <meta name="og:url" content={props.url} />
            <link rel="canonical" href={props.url} />
        </Head>
    );
}
