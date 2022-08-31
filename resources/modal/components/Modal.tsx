import clsx from "clsx";
import { observer } from "mobx-react";
import { useMobxStores } from "../../../_common/_stores/Stores";

function Modal() {
  const { modalStore } = useMobxStores();
  return modalStore.opened ? (
    <>
      <div
        className={clsx(`fixed z-0 bg-black transition-opacity`, {
          "opacity-0 inset-none": !modalStore.opened,
          "opacity-40 inset-0": modalStore.opened
        })}
        onClick={() => {
          modalStore.close();
        }}
      ></div>
      <div
        className={clsx(`bg-white drop-shadow-2xl md:rounded-xl text-base fixed z-10 transition-opacity`, {
          "w-0 h-0 opacity-0": !modalStore.opened && modalStore.fullScreen,
          "opacity-0 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2":
            !modalStore.opened && !modalStore.fullScreen,
          "w-screen h-screen rounded-none flex fixed opacity-1": modalStore.opened && modalStore.fullScreen,
          "top-0 md:top-1/2 right-0 md:right-1/2 md:translate-x-1/2 md:-translate-y-1/2 opacity-1":
            modalStore.opened && !modalStore.fullScreen
        })}
      >
        {modalStore.ModalComponent}
      </div>
    </>
  ) : null;
}

export const ModalObserver = observer(Modal);
