import React from "react";
import Image from "next/image";
import ListeLogo from "../../public/icons/Vector.svg";
import { useRouter } from "next/router";
import { urlsAdmin } from "../routes/routes";

type Props = {
  title: string;
  logo: string;
};

type TLINK_ASIDE = { id: number; urlName: string; label: string; logo: string };
type TLINK_ASIDE_ARRAY = TLINK_ASIDE[];

const LINK_ASIDE_ARRAY: TLINK_ASIDE_ARRAY = [
  {
    id: 1,
    urlName: urlsAdmin().home,
    label: "Tableau de bord",
    logo: ListeLogo
  },
  {
    id: 2,
    urlName: urlsAdmin().users,
    label: "Utilisateurs",
    logo: ListeLogo
  },
  {
    id: 3,
    urlName: urlsAdmin().category,
    label: "Catégorie",
    logo: ListeLogo
  },
  {
    id: 4,
    urlName: urlsAdmin().formations,
    label: "Formations",
    logo: ListeLogo
  },
  {
    id: 5,
    urlName: urlsAdmin().quizz,
    label: "Quizz",
    logo: ListeLogo
  }
];

export function AsideBar(props: Props) {
  const { replace } = useRouter();
  return (
    <div className={"bg-neutral-95 w-72 h-screen fixed top-0"}>
      <div className={"flex gap-4 items-center"}>
        <Image src={props.logo} alt={"dashboard logo"} width={100} height={100} />
        <h2 className={"text-white"}>{props.title}</h2>
      </div>
      <div className={"mt-20"}>
        <ul>
          {LINK_ASIDE_ARRAY.map((link: TLINK_ASIDE, index: number) => {
            return (
              <div key={index} className={"flex p-5 hover:bg-neutral-90 hover:cursor-pointer"}>
                <Image src={link.logo} alt={"liste logo"} />
                <li
                  key={link.id}
                  className={"text-white ml-4"}
                  onClick={() => {
                    replace(link.urlName);
                  }}
                >
                  {link.label}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
