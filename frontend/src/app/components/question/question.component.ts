import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Question} from "../../interfaces/question";
import {ButtonType} from "../../enums/button-type";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.sass"]
})
export class QuestionComponent {
  ButtonType = ButtonType;

  @Input() question!: Question;
  @Input() number!: number;
  @Output() onEditPressed: EventEmitter<unknown> = new EventEmitter();
  open = false;

  toggle($event: MouseEvent) {
    this.open = !this.open;
    $event.stopPropagation();
  }

  openEditDialog() {
    this.onEditPressed.emit();
  }
}
