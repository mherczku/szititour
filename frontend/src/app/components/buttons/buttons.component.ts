import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ButtonType} from "../../enums/button-type";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"]
})
export class ButtonsComponent {

  @Input() text = "Click here";
  @Input() textHover = "Click here hovered";
  @Input() classes = "";
  @Input() type: ButtonType = ButtonType.simple;
  @Input() iconSrc = "";
  @Input() isDisabledProgress = false;
  @Input() isDisabledBlocked = false;

  @Output() onClicked: EventEmitter<unknown> = new EventEmitter<unknown>();

  ButtonType = ButtonType;
  mouseOver = false;

  onClick() {
    if(!this.isDisabledBlocked && !this.isDisabledProgress){
      this.onClicked.emit();
    }
  }

}
