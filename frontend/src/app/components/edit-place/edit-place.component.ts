import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Place} from "../../interfaces/place";
import {TextInputType} from "../../enums/text-input-type";
import {ButtonType} from "../../enums/button-type";
import {Subscription} from "rxjs";
import {AdminService} from "../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";
import {Question} from "../../interfaces/question";
import {QuestionType} from "../../enums/question-type";

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType
  TextInputType = TextInputType;

  @Input() isEdit: boolean = false
  @Input() place!: Place
  @Output() placeChange: EventEmitter<Place> = new EventEmitter<Place>()

  editModalVisible: boolean = false;
  isEditQuestion: boolean = false;
  selectedQuestion!: Question

  saving: boolean = false
  deleting: boolean = false
  subscriptionSave?: Subscription
  subscriptionDelete?: Subscription

  constructor(
    private adminService: AdminService,
    private alert: HotToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.resetQuestion()
  }

  resetQuestion() {
    this.selectedQuestion = {
      id: 0,
      name: "",
      placeId: this.place.id,
      img: "",
      type: QuestionType.shortText,
      riddle: false
    }
  }

  savePlace() {
    if (this.isEdit) {
      this.saving = true
      this.subscriptionSave = this.adminService.updatePlace(this.place).subscribe({
        next: value => {
          this.alert.success(`${value.name} place Successfully updated`)
          this.saving = false
        },
        error: _err => {
          this.saving = false
        }
      })
    } else {
      this.saving = true
      this.subscriptionSave = this.adminService.addPlaceToGame(this.place).subscribe({
        next: value => {
          this.alert.success(`${value.name} place Successfully created`)
          this.saving = false
          this.router.navigateByUrl(`/admin-place/${value.gameId}/${value.id}`)
        },
        error: _err => {
          this.saving = false
        }
      })
    }
  }

  deletePlace() {
    const sure = window.confirm(`Are you sure to delete ${this.place.name}?`)
    if (sure) {
      this.deleting = true
      this.subscriptionDelete = this.adminService.deletePlace(this.place.id).subscribe({
        next: _value => {
          this.alert.success(`${this.place.name} place Successfully deleted`)
          this.deleting = false
          this.router.navigateByUrl("/admin")
        },
        error: _err => {
          this.deleting = false
        }
      })
    }
  }

  openNewQuestionDialog() {
    this.resetQuestion()
    this.isEditQuestion = false
    this.editModalVisible = true
  }

  openEditQuestionDialog(selectedQ: Question) {
    this.selectedQuestion = {...selectedQ}
    console.log("editing: ", this.selectedQuestion)
    this.isEditQuestion = true
    this.editModalVisible = true
  }

  editQuestionDialogExited($event: { action: "create" | "delete" | "update", question: Question }) {
    console.log("edited: ", $event.question)
    this.editModalVisible = false
    console.log($event)
     switch ($event.action) {
       case "create":
         this.place.questions.push($event.question)
         break;
       case "delete":
         const qDelete = this.place.questions.find(x => x.id === $event.question.id)
         if(qDelete) {
           const index = this.place.questions.indexOf(qDelete);
           if (index > -1) {
             this.place.questions.splice(index, 1);
           }
         }
         break;
       case "update":
         const qUpdate = this.place.questions.find(x => x.id === $event.question.id)
         if(qUpdate){
           const index = this.place.questions.indexOf(qUpdate);
           if (index > -1) {
             this.place.questions.splice(index, 1);
           }
           this.place.questions.push($event.question)
         }
         break;
     }
  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe()
    this.subscriptionDelete?.unsubscribe()
  }

}
