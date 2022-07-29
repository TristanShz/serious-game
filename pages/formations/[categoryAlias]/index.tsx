import { ReactElement } from "react";
import RegularLayout from "../../../resources/layouts/RegularLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { TitleBlock } from "../../../_common/ui/TitleBlock";
import { Line } from "../../../_common/ui/Line";
import { motion } from "framer-motion";

export const CategoryAlias = () => {
  return (
    <div className={"w-screen"}>
      <div
        className={
          "relative w-full h-[calc(80vh)] flex justify-center items-center "
        }
      >
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className={
            "absolute -z-20 inset-0 bg-cover bg-no-repeat bg-right-bottom bg-[url('/images/categories/categoryBg.png')]"
          }
        />
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className={"absolute inset-0 -z-10 bg-black opacity-20"}
        />
        <TitleBlock
          white
          smallText
          title={
            "Formations bac à bac+5 en développement web et logiciel, réseaux et cybersécurité"
          }
          text={
            "L'école Metz Numeric School est l'école de référence pour préparer les apprenants aux métiers du numérique dans les domaines de l'informatique, de la cybersécurité et du marketing digital. Les formations proposées peuvent être réalisées en formation initiale (Post-Bac et demandeurs d'emploi) ou en alternance dans le cadre d'un contrat d'apprentissage ou de professionnalisation (après un BAC+2 ou un BAC+3)."
          }
          className={"w-3/5"}
        />
        <Line color={"white"} scroll className={"absolute bottom-10 w-3/5"} />
      </div>
    </div>
  );
};

CategoryAlias.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ fixed: true }}>{page}</RegularLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { categoryAlias: "1" } },
      { params: { categoryAlias: "2" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const formations: string[] = [];

  return {
    props: { formations },
  };
};
export default CategoryAlias;
