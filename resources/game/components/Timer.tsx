import React from "react";
import Image from "next/image";
import woodSign from "/public/images/woodSign.svg";

type Props = {
  minutes: number
  seconds: number
};

export function Timer(props: Props) {

  return (
    <div className={"absolute right-2"}>
      <div className={"relative"}>
        <Image src={woodSign} />
        <div
          className={"absolute top-9 left-7 text-white text-center text-3xl font-medium"}>
          <p>Temps</p>
          <p>Restant</p>
          <p>{Math.floor(props.minutes)} : {props.seconds < 10 ? `0${props.seconds}` : props.seconds}</p>
        </div>
      </div>
    </div>
  );
}
