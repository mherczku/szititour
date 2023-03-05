import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Modal2Component} from "../components/modal2/modal2.component";


export type ModalData = {
  visible: boolean;
  component?: Type<Component>;
  extra?: unknown;
}

@Injectable({providedIn: "root"})
export class ModalService {
  private display: BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({visible: false});

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector)
  {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(Modal2Component)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    componentRef.instance.setCloseCallback(() => {
      this.close();
    });
    componentRef.instance.setDisplay(this.watch());


    const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);
  }

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
