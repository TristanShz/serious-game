import { ReactNode } from "react";
import { action, makeAutoObservable } from "mobx";

export interface IStore {}

export class ModalStore implements IStore {
    opened: boolean = false;
    ModalComponent: ReactNode;
    fullScreen: boolean = false;
    open = action((component: ReactNode, content: "confirm" | "edit") => {
        this.opened = true;
        if (content === "confirm") {
            this.ModalComponent = component;
        }
        if (content === "edit") {
            this.fullScreen = true;
            this.ModalComponent = component;
        }
    });
    close = action(() => {
        this.opened = false;
    });

    constructor() {
        makeAutoObservable(this);
    }
}

export const modalStore = new ModalStore();
