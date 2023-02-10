import {Component, Injectable, Type} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";


export type ModalData = {
  visible: boolean;
  component?: Type<Component>
}

@Injectable({providedIn: "root"})
export class ModalService {
  private display: BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({component: undefined, visible: false});

  watch(): Observable<ModalData> {
    return this.display.asObservable();
  }

  open(component: Type<Component>) {
    this.display.next({visible: true, component: component});
  }

  close() {
    this.display.next({visible: false});
  }

}
