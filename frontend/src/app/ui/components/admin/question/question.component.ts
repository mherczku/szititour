import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Question} from "../../../../types/question";
import {ButtonsComponent} from "../../buttons/buttons.component";
import {NgClass, NgIf} from "@angular/common";
import {QuestionTypePipeModule} from "../../../../pipes/question-type-pipe/question-type-pipe.module";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.sass"],
  imports: [
    ButtonsComponent,
    NgIf,
    NgClass,
    QuestionTypePipeModule,
    ImgSrcModule
  ],
  standalone: true
})
export class QuestionComponent {
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
