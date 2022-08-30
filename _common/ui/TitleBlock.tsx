import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import grandEst from "/public/images/grand-est.svg";

type Props = {
  title: string;
  text?: string;
  h1Title?: boolean;
  className?: string;
  smallText?: boolean;
  smallTitle?: boolean;
  white?: boolean;
  enterAnimation?: boolean;
  regionSupport?: boolean
};

export function TitleBlock(props: Props) {
  return (
    <div
      className={clsx("flex flex-col", props.className, {
        "gap-12": !props.smallTitle && !props.smallText,
        "gap-6": props.smallTitle || props.smallText,
        "text-neutral-10": props.white
      })}
    >
      <motion.div
        initial={{ opacity: props.enterAnimation ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {props.h1Title ? (
          <h1
            className={clsx(" font-extrabold", {
              "text-2xl md:text-5xl lg:text-6xl": !props.smallTitle,
              "text-xl md:text-2xl lg:text-3xl": props.smallTitle
            })}
          >
            {props.title}
          </h1>
        ) : (
          <h2
            className={clsx("font-extrabold", {
              "text-2xl md:text-5xl lg:text-6xl": !props.smallTitle,
              "text-xl md:text-2xl lg:text-3xl": props.smallTitle
            })}
          >
            {props.title}
          </h2>
        )}
      </motion.div>
      {
        props.regionSupport &&
        <div>
          <p className={"text-xs font-medium"}>AVEC LE SOUTIEN DE</p>
          <Image src={grandEst} width={80} height={23} />
        </div>
      }
      <motion.p
        initial={{ y: props.enterAnimation ? "100vh" : 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className={clsx("font-medium", {
          "text-md md:text-xl lg:text-2xl leading-[130%]": !props.smallText,
          "text-sm md:text-md lg:text-lg": props.smallText
        })}
      >
        {props.text}
      </motion.p>
    </div>
  );
}
