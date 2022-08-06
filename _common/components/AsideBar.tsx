import React from "react";
import Image from "next/image";
import ListeLogo from "../../public/icons/Vector.svg";

type Props = {
    title:string
    logo:string
};


type TLINK_ASIDE = { id:number ,label:string,logo:string}
type TLINK_ASIDE_ARRAY = TLINK_ASIDE[]

const LINK_ASIDE_ARRAY:TLINK_ASIDE_ARRAY = [
    {
        id:1,
        label:"Dashboard",
        logo:ListeLogo
    }
    ,{
        id:1,
        label:"Utilisateur",
        logo:ListeLogo,
    }
]

export function AsideBar(props: Props) {
    return (
        <div className={"bg-black-95 min-h-screen p-3"}>
            <div className={"flex gap-5"}>
                <Image src={props.logo} alt={"dashboard logo"}/>
                <h2 className={"text-white"}>{props.title}</h2>
            </div>
            <div className={"mt-20"}>
                <ul>
                {LINK_ASIDE_ARRAY.map((link:TLINK_ASIDE,index:number) => {
                    return(
                        <div key={index} className={"flex p-5"}>
                            <Image src={link.logo} alt={"liste logo"}/>
                            <li key={link.id} className={"text-white ml-4"}>{link.label}</li>
                        </div>
                    )
                })}
                </ul>
            </div>
        </div>
    );
}
