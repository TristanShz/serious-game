import { ReactElement } from "react";
import RegularLayout from "../../../resources/layouts/RegularLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { TitleBlock } from "../../../_common/ui/TitleBlock";
import { Line } from "../../../_common/ui/Line";
import { motion } from "framer-motion";
import { categoriesStore } from "../../../resources/categories/_stores/categoriesStore";
import { pages } from "../../../_config/pages";
import { TCategoryMdl } from "../../../resources/categories/_model/CategoryMdl";

export const CategoryAlias = (props: { formation: string; category: TCategoryMdl }) => {
    return (
        <div className={"w-screen"}>
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
    const formations: string[] = [];

    if (context.params && typeof context.params.categoryAlias === "string") {
        const res = await categoriesStore.getOneByAlias(context.params.categoryAlias);
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
