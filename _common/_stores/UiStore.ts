import { action, makeObservable, observable } from "mobx";

export class UiStore {
  isMounted = false;

  constructor() {
    makeObservable(this, {
      isMounted: observable,
      mount: action,
      unmount: action,
    });
  }

  mount() {
    this.isMounted = true;
  }

  unmount() {
    this.isMounted = false;
  }
}
