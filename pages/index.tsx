import RegularLayout from "../resources/layouts/RegularLayout";
import { ReactElement } from "react";
import { Button } from "../_common/ui/Button";
import Image from "next/image";
import homepageCircle from "/public/images/homePageCircle.png";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div
      className={
        "lg:flex justify-center items-center w-screen h-screen relative px-8 md:px-16  pt-[136px] overflow-hidden"
      }
    >
      <div
        className={
          "flex flex-col lg:w-3/4 h-fit flex-1 gap-6 md:gap-12 text-white lg:text-black"
        }
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1
            className={
              "text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-tight"
            }
          >
            Bienvenue sur Metz Numeric Game
          </h1>
        </motion.div>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={"text-lg md:text-2xl font-medium"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor Lorem ipsum{" "}
          </p>
        </motion.div>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Button
            content={"En savoir plus"}
            secondary
            color={"primary"}
            large
            className={"hidden md:flex ease-in-out"}
          />
          <Button
            content={"En savoir plus"}
            color={"primary"}
            large
            className={"flex md:hidden"}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className={"flex-1 hidden lg:block ease-in-out duration-700"}>
          <Image src={homepageCircle} objectFit={"contain"} />
        </div>
      </motion.div>
      <div
        className={
          "absolute inset-0 block lg:hidden bg-[url('/images/homePageMobile.png')] bg-cover bg-no-repeat bg-right-bottom -z-10"
        }
      />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ fixed: true }}>{page}</RegularLayout>;
};

export default observer(Home);
