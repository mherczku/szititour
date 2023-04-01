import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Question} from "../../../types/question";
import {QuestionType} from "../../../enums/question-type";

@Component({
  selector: "app-question-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./question-card.component.html",
  styleUrls: ["./question-card.component.scss"]
})
export class QuestionCardComponent {
  @Input() question!: Question;
  @Input() index!: number;

  QuestionType = QuestionType;

}
