import {Component, EventEmitter, Input, Output, signal} from "@angular/core";
import {Question} from "../../../../types/question";
import {ButtonsComponent} from "../../buttons/buttons.component";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {QuestionTypePipeModule} from "../../../../pipes/question-type-pipe/question-type-pipe.module";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";

@Component({
    selector: "app-question",
    templateUrl: "./question.component.html",
    styleUrls: ["./question.component.sass"],
    standalone: true,
    imports: [
        ButtonsComponent,
        NgIf,
        NgClass,
        QuestionTypePipeModule,
        ImgSrcModule,
        ImgLoaderPipe,
        CommonModule
    ]
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() number!: number;
  @Output() onEditPressed: EventEmitter<unknown> = new EventEmitter();
  $open = signal(false);

  toggle($event: MouseEvent) {
    this.$open.set(!this.$open());
    $event.stopPropagation();
  }

  openEditDialog() {
    this.onEditPressed.emit();
  }
}
