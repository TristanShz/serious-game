import { ReactElement } from "react";
import RegularLayout from "../resources/layouts/RegularLayout";
import { TitleBlock } from "../_common/ui/TitleBlock";
import { RegisterForm } from "../resources/auth/components/registerForm";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import Link from "next/link";

function Inscription() {
    return (
        <div className={"w-screen md:h-screen overflow-y-auto flex flex-col-reverse md:flex-row gap-6 md:gap-0"}>
            <div
                className={
                    "w-full md:w-2/5 flex-1 h-fit md:h-full flex flex-col justify-start md:justify-center items-start md:items-center px-8 md:px-12 lg:px-24 gap-3 lg:gap-6 pb-6 md:pb-0"
                }
            >
                <h2 className={"self-start font-bold text-xl md:text-2xl lg:text-3xl"}>S&rsquo;inscrire</h2>
                <RegisterForm />
                <div>
                    Vous avez déja un compte ?
                    <Link href={""}>
                        <a className={"text-primary"}> Se connecter</a>
                    </Link>
                </div>
            </div>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
                className={
                    "w-full md:w-3/5 md:h-full flex-1 md:flex-0 bg-[url('/images/blueBackground.png')] bg-cover bg-no-repeat bg-right-bottom flex justify-center items-center px-8 md:px-16 lg:px-32 xl:px-40 mt-[90px] py-6 md:mt-0 md:pt-0"
                }
            >
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 100 }}>
                    <TitleBlock
                        h1Title
                        title={"Rejoignez l'aventure Metz Numeric School"}
                        text={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        }
                        className={"text-black-10"}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

Inscription.getLayout = function getLayout(page: ReactElement) {
    return <RegularLayout headerProps={{ white: true, full: true }}>{page}</RegularLayout>;
};

export default observer(Inscription);
