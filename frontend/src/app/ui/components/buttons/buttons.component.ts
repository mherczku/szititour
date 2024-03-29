import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from "@angular/core";
import {NgClass, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
  imports: [
    NgClass,
    NgSwitch,
    NgSwitchCase
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent {

  @Input() text = "Click here";
  @Input() textHover = "Click here hovered";
  @Input() classes = "";
  @Input() type: "icon" | "delete" | "blueIcon" = "icon";
  @Input() iconSrc = "";
  @Input() isDisabledProgress = false;
  @Input() isDisabledBlocked = false;
  @Output() clicked: EventEmitter<unknown> = new EventEmitter<unknown>();

  $mouseOver = signal(false);

  onClick() {
    if(!this.isDisabledBlocked && !this.isDisabledProgress){
      this.clicked.emit();
    }
  }

}
