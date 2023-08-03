import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnswerDto} from "../../../../types/team-game-status";
import {QuestionType} from "../../../../enums/question-type";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";
import {AdminActiveGameService} from "../../../../services/AdminActiveGameService";
import {AutoDestroy} from "../../../../decorators/autodestroy.decorator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: "app-answer",
  standalone: true,
  imports: [CommonModule, ImgSrcModule],
  templateUrl: "./answer.component.html",
  styleUrls: ["./answer.component.scss"]
})
export class AnswerComponent {

  @Input() answer: AnswerDto = {
    answerBoolean: false,
    answerNumber: 1,
    answerText: "this is an answer",
    correct: undefined,
    id: 0,
    img: "",
    questionDtoNoAnswers: {
      name: "Is this a question?",
      type: QuestionType.shortText,
      id: 1,
      placeId: 2,
      riddle: false
    },
    teamId: 0
  };

  @Input() index = 1;

  protected readonly QuestionType = QuestionType;
  evaluateId?: number;

  @AutoDestroy destroy$ = new Subject();

  constructor(private adminActiveService: AdminActiveGameService) {
  }

  evaluateAnswer(isCorrect: boolean) {
    this.adminActiveService.evaluateAnswer(this.answer.id, isCorrect).pipe(takeUntil(this.destroy$)).subscribe(answer => {
      this.answer.correct = answer.correct;
    });
  }
}
