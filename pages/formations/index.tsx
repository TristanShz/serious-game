import { ReactElement } from "react";
import RegularLayout from "../../resources/layouts/RegularLayout";
import { TitleBlock } from "../../_common/ui/TitleBlock";
import { formations } from "../../resources/formations/data";
import { Line } from "../../_common/ui/Line";
import { CategoryBlock } from "../../resources/formations/categories/components/CategoryBlock";
import { GetStaticProps } from "next";
import { TCategoryMdl } from "../../resources/formations/categories/_model/CategoryMdl";
import { categoriesStore } from "../../resources/formations/categories/_stores/categoriesStore";
import { pages } from "../../_config/pages";

const Formations = (props: { categories: TCategoryMdl[] }) => {
  return (
    <div className={"w-screen flex flex-col items-center px-6 overflow-hidden"}>
      <div className={"h-screen md:w-2/3 lg:w-3/5 justify-center flex flex-col relative"}>
        <TitleBlock title={formations.title} h1Title smallText text={formations.description} enterAnimation />
        <Line className={"absolute bottom-10"} scroll color={"background-border"} />
      </div>
      {props.categories.map((category) => {
        return (
          <div
            className={"h-screen md:w-2/3 lg:w-3/5 justify-center flex flex-col relative"}
            key={category._id}
          >
            <CategoryBlock
              imageUrl={category.imageUrl}
              redirectTo={pages.category.path(category.urlAlias)}
              title={category.blockTitle}
              description={category.blockDescription}
            />
            <Line className={"absolute bottom-10"} color={"background-border"} />
          </div>
        );
      })}
    </div>
  );
};

Formations.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ fixed: true }}>{page}</RegularLayout>;
};

export const getStaticProps: GetStaticProps = async () => {

  const { items: categories } = await categoriesStore.list();
  return {
    props: {
      categories
    },
    revalidate: 10
  };
};

export default Formations;
