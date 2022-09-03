import { ReactElement } from "react";
import RegularLayout from "../../../resources/layouts/RegularLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { TitleBlock } from "../../../_common/ui/TitleBlock";
import { Line } from "../../../_common/ui/Line";
import { motion } from "framer-motion";
import { categoriesStore } from "../../../resources/formations/categories/_stores/categoriesStore";
import { pages } from "../../../_config/pages";
import { formationsStore } from "../../../resources/formations/_stores/FormationsStore";
import { TFormationMdl } from "../../../resources/formations/_models/FormationMdl";
import { TCategoryMdl } from "../../../resources/formations/categories/_model/CategoryMdl";
import { Accordion } from "../../../_common/ui/Accordion";
import { Section } from "../../../_common/ui/Section";
import { Button } from "../../../_common/ui/Button";

export const FormationAlias = (props: { formation: TFormationMdl, category: TCategoryMdl }) => {
  return (
    <div className={"w-screen flex flex-col"}>
      <div className={"relative w-full h-[calc(80vh)] flex justify-center items-center "}>
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
        <TitleBlock white smallText title={props.formation.title} text={props.formation.description}
                    className={"w-3/5"} regionSupport={props.formation.regionSupport} />
        <Line color={"white"} scroll className={"absolute bottom-10 w-3/5"} />
      </div>
      <div className={"w-[45%] flex flex-col self-center py-8 gap-16"}>
        <Section title={"Contenu des tests"}>
          <div>
            {
              props.formation.quizz?.map(quizz => {
                return <Accordion title={quizz.name} content={quizz.description} key={quizz._id} />;
              })
            }
          </div>
        </Section>
        <Section title={"Déroulement des tests"}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. </p>
          <br />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. </p>
        </Section>
        <Button content={"Accéder aux tests"} color={"primary"} secondary large
                link={pages.quizz.path(props.formation._id)} />
      </div>
    </div>
  );
};

FormationAlias.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ fixed: true }}>{page}</RegularLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { items: categories } = await categoriesStore.list();
  const { items: formations } = await formationsStore.list();

  return {
    paths: formations.map((formation) => {
      const categoryAlias = categories.find((category) => category._id === formation.category)!.urlAlias;
      return {
        params: {
          categoryAlias,
          formationAlias: formation.alias
        }
      };
    }),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params && typeof context.params.formationAlias === "string") {
    const alias = context.params.formationAlias;
    const { data: formation } = await formationsStore.getOneByAlias(alias);

    return {
      props: { formation },
      revalidate: 10
    };
  } else {
    return {
      redirect: {
        destination: pages.formations.path,
        permanent: false
      }
    };
  }
};
export default FormationAlias;
