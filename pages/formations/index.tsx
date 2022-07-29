import { ReactElement } from "react";
import RegularLayout from "../../resources/layouts/RegularLayout";
import { TitleBlock } from "../../_common/ui/TitleBlock";
import { formations } from "../../resources/formations/data";
import { Line } from "../../_common/ui/Line";
import { CategoryBlock } from "../../resources/formations/categories/components/CategoryBlock";
import SmoothScroll from "../../_common/ui/SmoothScroll";

const Formations = () => {
  return (
    <SmoothScroll>
      <div className={"w-screen flex flex-col items-center px-6"}>
        <div
          className={
            "h-screen md:w-2/3 lg:w-3/5 justify-center flex flex-col relative"
          }
        >
          <TitleBlock
            title={formations.title}
            h1Title
            smallText
            text={formations.description}
            enterAnimation
          />
          <Line
            className={"absolute bottom-10"}
            scroll
            color={"background-border"}
          />
        </div>
        <div
          className={
            "h-screen md:w-2/3 lg:w-3/5 justify-center flex flex-col relative"
          }
        >
          <CategoryBlock
            imageUrl={"/images/categories/softwareEngineering.png"}
            redirectTo={"formations/1"}
          />
          <Line className={"absolute bottom-10"} color={"background-border"} />
        </div>
        <div
          className={
            "h-screen md:w-2/3 lg:w-3/5 justify-center flex flex-col relative"
          }
        >
          <CategoryBlock
            imageUrl={"/images/categories/businessAndMarketing.png"}
            redirectTo={"/"}
          />
          <Line className={"absolute bottom-10"} color={"background-border"} />
        </div>
        <div
          className={
            "h-screen md:w-2/3 lg:w-3/5 justify-center flex flex-col relative"
          }
        >
          <CategoryBlock
            imageUrl={"/images/categories/cyberSecurity.png"}
            redirectTo={"/"}
          />
          <Line className={"absolute bottom-10"} color={"background-border"} />
        </div>
      </div>
    </SmoothScroll>
  );
};

Formations.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ fixed: true }}>{page}</RegularLayout>;
};

export default Formations;
