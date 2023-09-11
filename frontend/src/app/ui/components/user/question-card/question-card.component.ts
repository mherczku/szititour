import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Question} from "../../../../types/question";
import {QuestionType} from "../../../../enums/question-type";
import {AnswerDto, TeamGameStatus} from "../../../../types/team-game-status";
import {FormsModule} from "@angular/forms";
import {ActiveGameService} from "../../../../services/ActiveGameService";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";

@Component({
  selector: "app-question-card",
  standalone: true,
  imports: [CommonModule, FormsModule, ImgSrcModule],
  templateUrl: "./question-card.component.html",
  styleUrls: ["./question-card.component.scss"]
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

  @ViewChild("questionFileInput")
  fileInputRef: ElementRef | undefined;

  _question!: Question;
  _teamStatus!: TeamGameStatus | null;
  _savedAnswer?: AnswerDto;


  QuestionType = QuestionType;
  currentAnswer: string | number = "";
  answerIsSame = false;

  currentImg?: string;

  constructor(private activeGameService: ActiveGameService) {

  }

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
          this.fileInputRef?.nativeElement ? this.fileInputRef.nativeElement.value = null : undefined;
          this.currentImg = undefined;
          break;

        case QuestionType.year:
          this.currentAnswer = this._savedAnswer?.answerNumber ?? "";
          break;
      }
      this.setIsAnswerSameAsStatus();
    }
  }

  setIsAnswerSameAsStatus() {
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
        this.answerIsSame = !this.currentImg;
        break;

      case QuestionType.year:
        this.answerIsSame = this.currentAnswer === this._savedAnswer?.answerNumber;
        break;

    }
  }

  changed($event: any) {
    this.currentAnswer = $event;
    this.setIsAnswerSameAsStatus();
    if (!this.answerIsSame) {
      switch (this._question.type) {
        case QuestionType.shortText:
          this.activeGameService.addAnswer(this._question.id, {answerText: $event});
          break;

        case QuestionType.longText:
          this.activeGameService.addAnswer(this._question.id, {answerText: $event});
          break;

        case QuestionType.number:
          this.activeGameService.addAnswer(this._question.id, {answerNumber: $event});
          break;

        case QuestionType.imgOnly:
          return;

        case QuestionType.year:
          this.activeGameService.addAnswer(this._question.id, {answerNumber: $event});
          break;
      }
    }
    //this.setIsAnswerSameAsStatus();
  }

  inputFileChanged($event: any) {
    if ($event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.currentImg = fileReader.result as string;
        this.setIsAnswerSameAsStatus();
      };
      fileReader.readAsDataURL($event.target.files[0]);
      this.activeGameService.addAnswer(this._question.id, {imgFile: $event.target.files[0]});
    }
  }
}
