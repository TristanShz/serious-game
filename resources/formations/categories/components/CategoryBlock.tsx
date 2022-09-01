import { TitleBlock } from "../../../../_common/ui/TitleBlock";
import { Button } from "../../../../_common/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  imageUrl: string;
  redirectTo: string;
  title: string;
  description: string;
};

export function CategoryBlock(props: Props) {
  return (
    <motion.div
      initial={{ y: "60vh" }}
      viewport={{ margin: "400px", once: true }}
      whileInView={{
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.7,
          duration: 0.8,
          stiffness: 50
        }
      }}
      className={"flex h-full md:h-4/5 flex-col md:flex-row w-full gap-6"}
    >
      <div
        style={{
          backgroundImage: `url(${props.imageUrl})`
        }}
        className={"flex-1 bg-cover bg-no-repeat bg-right-bottom rounded-lg"}
      ></div>
      <motion.div
        initial={{ y: "60vh" }}
        viewport={{ margin: "400px", once: true }}
        whileInView={{
          y: 0,
          transition: {
            type: "spring",
            bounce: 0.7,
            duration: 1,
            stiffness: 50
          }
        }}
        className={"flex-1 flex flex-col md:justify-center md:items-center gap-7 box-border"}
      >
        <TitleBlock title={props.title} text={props.description} smallTitle smallText />
        <Link href={props.redirectTo}>
          <a>
            <Button content={"Voir les formations"} color={"primary"} secondary className={"self-start"} />
          </a>
        </Link>
      </motion.div>
    </motion.div>
  );
}
