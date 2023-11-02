import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Question } from "../../../../types/question";
import { QuestionType } from "../../../../enums/question-type";
import { AnswerDto, TeamGameStatus } from "../../../../types/team-game-status";
import { FormsModule } from "@angular/forms";
import { ActiveGameService } from "../../../../services/ActiveGameService";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";

@Component({
  selector: "app-question-card",
  standalone: true,
  templateUrl: "./question-card.component.html",
  styleUrls: ["./question-card.component.scss"],
  imports: [CommonModule, FormsModule, ImgSrcModule, ImageUploaderComponent, ImgLoaderPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCardComponent {
  @Input() index!: number;

  @Input() set question(value: Question) {
    this._question = value;
    this.setCurrentAnswerData();
  }

  @Input() set teamStatus(value: TeamGameStatus | null) {
    this._teamStatus = value;
    this.setCurrentAnswerData();
  }

  _question!: Question;
  _teamStatus!: TeamGameStatus | null;
  _savedAnswer?: AnswerDto;

  QuestionType = QuestionType;
  currentAnswer: string | number = "";
  answerIsSame = false;

  currentImgChanged = false;

  constructor(private readonly activeGameService: ActiveGameService) { }

  setCurrentAnswerData() {
    if (this._question && this._teamStatus) {
      this._savedAnswer = this._teamStatus?.placeStatuses?.find(ps => ps.placeId === this._question.placeId)?.qanswers?.find(a => a.questionDtoNoAnswers.id === this._question.id);
      switch (this._question.type) {

        case QuestionType.shortText:
          this.currentAnswer = this._savedAnswer?.answerText ?? "";
          break;

        case QuestionType.longText:
          this.currentAnswer = this._savedAnswer?.answerText ?? "";
          break;

        case QuestionType.number:
          this.currentAnswer = this._savedAnswer?.answerNumber ?? "";
          break;

        case QuestionType.imgOnly:
          this.currentImgChanged = false;
          break;

        case QuestionType.year:
          this.currentAnswer = this._savedAnswer?.answerNumber ?? "";
          break;
      }
      this.setIsAnswerSameAsStatus();
    }
  }

  setIsAnswerSameAsStatus() {
    console.log(this.answerIsSame = !this.currentImgChanged && (this._savedAnswer?.img?.length ?? 0) > 0)
    console.log(this._savedAnswer)
    switch (this._question.type) {

      case QuestionType.shortText:
        this.answerIsSame = this.currentAnswer === this._savedAnswer?.answerText;
        break;

      case QuestionType.longText:
        this.answerIsSame = this.currentAnswer === this._savedAnswer?.answerText;
        break;

      case QuestionType.number:
        this.answerIsSame = this.currentAnswer === this._savedAnswer?.answerNumber;
        break;

      case QuestionType.imgOnly:
        this.answerIsSame = this.answerIsSame = !this.currentImgChanged && (this._savedAnswer?.img?.length ?? 0) > 0;
        break;

      case QuestionType.year:
        this.answerIsSame = this.currentAnswer === this._savedAnswer?.answerNumber;
        break;

    }
  }

  changed($event: number | string) {
    this.currentAnswer = $event;
    this.setIsAnswerSameAsStatus();
    if (!this.answerIsSame) {
      switch (this._question.type) {
        case QuestionType.shortText:
          this.activeGameService.addAnswer(this._question.id, { answerText: String($event) });
          break;

        case QuestionType.longText:
          this.activeGameService.addAnswer(this._question.id, { answerText: String($event) });
          break;

        case QuestionType.number:
          this.activeGameService.addAnswer(this._question.id, { answerNumber: Number($event) });
          break;

        case QuestionType.imgOnly:
          return;

        case QuestionType.year:
          this.activeGameService.addAnswer(this._question.id, { answerNumber: Number($event) });
          break;
      }
    }
    //this.setIsAnswerSameAsStatus();
  }

  inputFileChanged(file: File) {
    this.currentImgChanged = true;
    this.activeGameService.addAnswer(this._question.id, { imgFile: file });
    this.setIsAnswerSameAsStatus();
  }
}
