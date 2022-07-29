import React from "react";
import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { Hamburger } from "./Hamburger";
import { PanelMenu } from "./PanelMenu";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMobxStores } from "../../../../_common/_stores/Stores";

export type THeaderProps = {
  white?: boolean;
  fixed?: boolean;
  full?: boolean;
};

export const Header = observer((props: THeaderProps) => {
  const { menuStore } = useMobxStores();
  return (
    <>
      <header
        className={clsx(
          "flex justify-between px-8 md:px-16 py-6 md:py-12 top-0 inset-x-0 z-50",
          {
            fixed: props.fixed,
            absolute: !props.fixed,
          }
        )}
      >
        <Link href={"/"}>
          <motion.a
            initial={{ y: "-200%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Logo />
          </motion.a>
        </Link>
        <motion.div
          initial={{ y: "-200%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {props.full ? (
            menuStore.isOpen ? (
              <Hamburger />
            ) : (
              <>
                <Menu className={"hidden lg:flex"} white={props.white} />
                <Hamburger className={"flex lg:hidden"} />
              </>
            )
          ) : (
            <Hamburger />
          )}
        </motion.div>
      </header>
      <PanelMenu />
    </>
  );
});
