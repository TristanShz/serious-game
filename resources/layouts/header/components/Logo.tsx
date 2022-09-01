import Image from "next/image";
import logo from "/public/logo.svg";
import { useMobxStores } from "../../../../_common/_stores/Stores";
import { observer } from "mobx-react-lite";

type Props = {};

export const Logo = observer((props: Props) => {
  const { menuStore } = useMobxStores();

  return (
    <Image
      src={logo}
      width={135}
      height={35}
      onClick={() => {
        if (menuStore.isOpen) menuStore.toggleOpen();
      }}
    />
  );
});
