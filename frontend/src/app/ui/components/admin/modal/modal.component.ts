import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {

  @Input() displayedClassName = "";
  @Input() isDisplayed = false;
  @Input() classes = "";
  @Output() isDisplayedChange = new EventEmitter<boolean>();

  @ViewChild("modalContent")
  modal!: ElementRef;

  @HostListener("click", ["$event"])
  clickInside(event: FocusEvent) {
    if(!this.modal.nativeElement.contains(event.target)){
      this.isDisplayedChange.emit(false);
      this.isDisplayed = false;
    }
  }

}
