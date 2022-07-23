import { action, makeObservable, observable } from "mobx";

export class MenuStore {
  isOpen: boolean;

  constructor() {
    this.isOpen = false;
    makeObservable(this, {
      isOpen: observable,
      toggleOpen: action,
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    console.log("toggle");
  }
}
