import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"]
})
export class ButtonsComponent {

  @Input() text = "Click here";
  @Input() textHover = "Click here hovered";
  @Input() classes = "";
  @Input() type: "icon" | "delete" | "blueIcon" = "icon";
  @Input() iconSrc = "";
  @Input() isDisabledProgress = false;
  @Input() isDisabledBlocked = false;
  @Output() onClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  mouseOver = false;

  onClick() {
    if(!this.isDisabledBlocked && !this.isDisabledProgress){
      this.onClicked.emit();
    }
  }

}
