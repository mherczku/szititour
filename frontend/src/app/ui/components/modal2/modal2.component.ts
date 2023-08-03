import {ChangeDetectorRef, Component, Type, ViewChild} from "@angular/core";
import {Observable, of} from "rxjs";
import {ModalData} from "../../../services/ModalService";
import {HostDirective} from "../../../directives/hostDirective";

@Component({
  selector: "app-modal2",
  template: `
    <div [ngClass]="display_.visible ? '' : 'hidden-host'" id="ngx-modal-host-container" (click)="close()"
         class="host-container">
      <div (click)="$event.stopPropagation()" class="content-container">
        <ng-template host></ng-template>
      </div>
    </div>
  `,
  styleUrls: ["./modal2.component.scss"]
})
export class Modal2Component {
  display$: Observable<ModalData> = of({component: undefined, visible: false});

  display_: ModalData = {visible: false};

  @ViewChild(HostDirective, {static: true}) host!: HostDirective;
  private closeCallback?: () => void;

  constructor(private cdr: ChangeDetectorRef) {
  }

  setCloseCallback(callback: () => void) {
    this.closeCallback = callback;
  }

  setDisplay(ds: Observable<ModalData>) {
    console.log({ds});
    this.display$ = ds;
    this.display$.subscribe(data => {
      this.display_ = data;
      this.cdr.detectChanges();
      if (data.visible) {
        this.open(data.component);
      }
    });
  }

  open(component?: Type<Component>) {
    if (component !== undefined) {
      const viewContainerRef = this.host.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent<Component>(component);
    }
  }

  close() {
    this.closeCallback?.();
    this.host.viewContainerRef.clear();
  }

}
