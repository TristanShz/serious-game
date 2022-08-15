import React, { useState } from "react";
import Image from "next/image";
import { TEntryLevel } from "../../../lib/formations/FormationModel";
import formation5 from "/public/images/formations/formation5.jpg";
import grandEst from "/public/images/grand-est.svg";
import { Arrow } from "../../../_common/ui/Arrow";
import clsx from "clsx";
import { useRouter } from "next/router";

type Props = {
    title: string;
    entryLevel: TEntryLevel;
    regionSupport: boolean;
    alias: string;
    redirectTo: string;
};

export function FormationBlock(props: Props) {
    const [hover, setHover] = useState(false);
    const { push } = useRouter();

    return (
        <div
            className={
                "flex flex-col xl:flex-row bg-neutral-5 rounded-3xl gap-6 items-center my-8 shadow-sm hover:cursor-pointer hover:text-primary active:scale-98 ease-in-out duration-500"
            }
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => push(props.redirectTo)}
        >
            <div className={"w-full h-52 xl:w-52 relative"}>
                <Image
                    src={formation5}
                    className={"rounded-t-3xl xl:rounded-3xl"}
                    layout={"fill"}
                    objectFit={"cover"}
                    objectPosition={"center"}
                />
            </div>
            <div className={"flex items-center flex-1 pl-4 pb-4"}>
                <div className={"flex flex-col gap-2"}>
                    <h2 className={"text-xl font-bold"}>{props.title}</h2>
                    <p className={"text-primary font-medium"}>Bac</p>
                    {props.regionSupport && (
                        <div className={"text-neutral"}>
                            <p className={"uppercase font-light text-sm"}>Avec le soutien de</p>
                            <Image src={grandEst} width={70} height={21} />
                        </div>
                    )}
                </div>
                <Arrow className={clsx("ease-in-out duration-500", { "translate-x-2": hover })} />
            </div>
        </div>
    );
}
