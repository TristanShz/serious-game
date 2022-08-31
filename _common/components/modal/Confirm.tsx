import { Button } from "../../../_common/ui/Button";
import { Paper } from "../../ui/Paper";
import { useMobxStores } from "../../_stores/Stores";

type Props = {
  title: string;
  question: string;
  onAccept?: () => void;
};

export default function Confirm(props: Props) {
  const { modalStore } = useMobxStores();
  return (
    <Paper className={"p-6 flex flex-col gap-6"}>
      <h1 className={"text-center"}>{props.title}</h1>
      <p className={"text-center"}>{props.question}</p>
      <div className={"w-full flex gap-3 justify-around"}>
        <Button color={"gradient"} content={"oui"} type={"button"} onClick={props.onAccept} />
        <Button secondary content={"non"} type={"button"} onClick={modalStore.close} />
      </div>
    </Paper>
  );
}
