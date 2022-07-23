import React from "react";
import Image from "next/image";
import logo from "/public/logo.svg";

type Props = {};

export function Logo(props: Props) {
  return <Image src={logo} width={135} height={35} />;
}
