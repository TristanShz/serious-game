import { ReactElement } from "react";
import RegularLayout from "../../../resources/layouts/RegularLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { TitleBlock } from "../../../_common/ui/TitleBlock";
import { Line } from "../../../_common/ui/Line";
import { motion } from "framer-motion";
import { categoriesStore } from "../../../resources/formations/categories/_stores/categoriesStore";
import { pages } from "../../../_config/pages";
import { TCategoryMdl } from "../../../resources/formations/categories/_model/CategoryMdl";
import { formationsStore } from "../../../resources/formations/_stores/FormationsStore";
import { TFilterType } from "../../../_common/_types/filterTypes";
import { FormationBlock } from "../../../resources/formations/components/FormationBlock";
import { TFormationMdl } from "../../../resources/formations/_models/FormationMdl";

export const CategoryAlias = (props: { formations: TFormationMdl[]; category: TCategoryMdl }) => {
    console.log(props.formations);
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
                <TitleBlock
                    white
                    smallText
                    title={props.category.pageTitle}
                    text={props.category.pageDescription}
                    className={"w-3/5"}
                />
                <Line color={"white"} scroll className={"absolute bottom-10 w-3/5"} />
            </div>
            <div className={"w-[45%] flex flex-col self-center"}>
                <div className={"flex my-12 items-center gap-4"}>
                    <p className={"uppercase font-bold"}>Liste de nos formations</p>
                    <div className={"h-0.4 bg-black flex-1"} />
                </div>
                <FormationBlock
                    {...props.formations[0]}
                    redirectTo={pages.formation.path(props.category.urlAlias, props.formations[0].alias)}
                />
            </div>
        </div>
    );
};

CategoryAlias.getLayout = function getLayout(page: ReactElement) {
    return <RegularLayout headerProps={{ fixed: true }}>{page}</RegularLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { items: categories } = await categoriesStore.list();

    return {
        paths: categories.map((category) => {
            return { params: { categoryAlias: category.urlAlias } };
        }),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    if (context.params && typeof context.params.categoryAlias === "string") {
        const alias = context.params.categoryAlias;
        const res = await categoriesStore.getOneByAlias(alias);
        const { items: formations } = await formationsStore.listing(alias, undefined, undefined, undefined, [
            {
                id: "category ",
                type: TFilterType.ID,
                value: res.data._id,
            },
        ]);
        return {
            props: { formations, category: res.data },
            revalidate: 10,
        };
    } else {
        return {
            redirect: {
                destination: pages.formations.path,
                permanent: false,
            },
        };
    }
};
export default CategoryAlias;
