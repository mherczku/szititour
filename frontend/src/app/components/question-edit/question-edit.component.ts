import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Question} from "../../interfaces/question";
import {QuestionType} from "../../enums/question-type";
import {ButtonType} from "../../enums/button-type";
import {Subscription} from "rxjs";
import {AdminService} from "../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.sass']
})
export class QuestionEditComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;

  @Input() isEdit: boolean = false;
  @Input() question: Question = {
    id: 0,
    img: "",
    name: "",
    type: QuestionType.shortText,
    placeId: 1,
    riddle: false
  };
  @Output() onExit: EventEmitter<{ action: 'create' | 'delete' | 'update', question: Question }> = new EventEmitter()

  saving: boolean = false;
  deleting: boolean = false;
  subscriptionSave?: Subscription
  subscriptionDelete?: Subscription

  constructor(private adminService: AdminService, private alert: HotToastService) {
  }

  ngOnInit(): void {
  }

  save() {
    if(this.isEdit){
      console.log(this.question.riddle, "saving")
      this.saving = true
      this.subscriptionSave = this.adminService.updateQuestion(this.question).subscribe({
        next: value => {
          this.alert.success(`Question successfully updated`)
          this.saving = false
          this.onExit.emit({action: "update", question: value})
        },
        error: err => {
          this.saving = false
        }
      })
    } else {
      this.saving = true
      this.subscriptionSave = this.adminService.createQuestion(this.question).subscribe({
        next: value => {
          this.alert.success(`Question successfully created`)
          this.saving = false
          this.onExit.emit({action: "create", question: value})
        },
        error: err => {
          this.saving = false
        }
      })
    }
  }

  delete() {
    const sure = window.confirm("Are you sure to delete this question?")
    if(sure) {
      this.deleting = true
      this.subscriptionDelete = this.adminService.deleteQuestion(this.question.id).subscribe({
        next: value => {
          this.alert.success(`Question successfully deleted`)
          this.deleting = false
          this.onExit.emit({action: "delete", question: this.question})
        },
        error: err => {
          this.deleting = false
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe()
    this.subscriptionDelete?.unsubscribe()
  }
}
