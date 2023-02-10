import {Component, Injectable, Type} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";


export type ModalData = {
  visible: boolean;
  component?: Type<Component>;
  extra?: unknown;
}

@Injectable({providedIn: "root"})
export class ModalService {
  private display: BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({visible: false});
  watch(): Observable<ModalData> {
    return this.display.asObservable();
  }

  getExtra(): unknown {
    return this.display.getValue().extra;
  }

  open(component: Type<Component>, extra?: unknown) {
    this.display.next({visible: true, component: component, extra: extra});
  }

  close() {
    this.display.next({visible: false});
  }

}
