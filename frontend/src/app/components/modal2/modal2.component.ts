import {Component, OnInit, Type, ViewChild} from "@angular/core";
import {Observable, of} from "rxjs";
import {ModalData, ModalService} from "../../services/ModalService";
import {HostDirective} from "../../directives/hostDirective";

@Component({
  selector: "app-modal2",
  template: `
    <div [ngClass]="(display$ | async)?.visible ? '' : 'hidden-host'" (click)="close()" class="host-container">
      <div (click)="$event.stopPropagation()" class="content-container">
        <ng-template host></ng-template>
      </div>
    </div>
  `,
  styleUrls: ["./modal2.component.scss"]
})
export class Modal2Component implements OnInit {
  display$: Observable<ModalData> = of({component: undefined, visible: false});
  @ViewChild(HostDirective, {static: true}) host!: HostDirective;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.display$.subscribe( data => {
      if(data.visible) {
        this.open(data.component);
      } else {
      }
    });
  }


  open(component?: Type<Component>) {
    if(component !== undefined) {
      const viewContainerRef = this.host.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent<Component>(component);
    }
  }

  close() {
    this.host.viewContainerRef.clear();
    this.modalService.close();
  }

}
