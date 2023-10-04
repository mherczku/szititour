import { ChangeDetectionStrategy, Component, DestroyRef, Input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnswerDto } from "../../../../types/team-game-status";
import { QuestionType } from "../../../../enums/question-type";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { AdminActiveGameService } from "../../../../services/AdminActiveGameService";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-answer",
  standalone: true,
  templateUrl: "./answer.component.html",
  styleUrls: ["./answer.component.scss"],
  imports: [CommonModule, ImgSrcModule, ImgLoaderPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerComponent {

  @Input({ required: true }) answer: AnswerDto = {
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
  $evaluateId = signal(-1);

  constructor(
    private readonly adminActiveService: AdminActiveGameService,
    private readonly destroyRef: DestroyRef) { }

  evaluateAnswer(isCorrect: boolean) {
    this.adminActiveService.evaluateAnswer(this.answer.id, isCorrect).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (answer) => {
        this.answer.correct = answer.correct;
        this.$evaluateId.set(-1);
      },
      error: () => this.$evaluateId.set(-1)
    });
  }
}
