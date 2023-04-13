import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {Place} from "../../../../types/place";
import {Subscription} from "rxjs";
import {AdminService} from "../../../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";
import {Question} from "../../../../types/question";
import {QuestionType} from "../../../../enums/question-type";

@Component({
  selector: "app-edit-place",
  templateUrl: "./edit-place.component.html",
  styleUrls: ["./edit-place.component.css"]
})
export class EditPlaceComponent implements OnInit, OnDestroy {
  @Input() isEdit = false;
  @Input() place!: Place;
  @Output() placeChange: EventEmitter<Place> = new EventEmitter<Place>();

  @ViewChild("fileInput")
  fileInput?: ElementRef;

  file?: File;

  editModalVisible = false;
  isEditQuestion = false;
  selectedQuestion!: Question;

  saving = false;
  deleting = false;
  subscriptionSave?: Subscription;
  subscriptionDelete?: Subscription;

  constructor(
    private adminService: AdminService,
    private alert: HotToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.resetQuestion();
  }

  resetQuestion() {
    this.selectedQuestion = {
      id: 0,
      name: "",
      placeId: this.place.id,
      img: "",
      type: QuestionType.shortText,
      riddle: false
    };
  }

  setFile(event: any) {
    this.file = event.target.files[0];
  }

  savePlace() {
    if (this.isEdit) {
      this.saving = true;
      this.subscriptionSave = this.adminService.updatePlace(this.place, this.file).subscribe({
        next: value => {
          this.alert.success(`${value.name} helyszín sikeresen frissítve`);
          this.saving = false;
          this.place = value;
          this.fileInput?.nativeElement.value ? this.fileInput.nativeElement.value = null : undefined;
        },
        error: _err => {
          this.saving = false;
        }
      });
    } else {
      this.saving = true;
      this.subscriptionSave = this.adminService.addPlaceToGame(this.place, this.file).subscribe({
        next: value => {
          this.alert.success(`${value.name} helyszín sikeresen létrehozva`);
          this.saving = false;
          this.router.navigateByUrl(`/admin-place/${value.gameId}/${value.id}`);
        },
        error: _err => {
          this.saving = false;
        }
      });
    }
  }

  deletePlace() {
    const sure = window.confirm(`Biztos törlöd a ${this.place.name} helyszínt?`);
    if (sure) {
      this.deleting = true;
      this.subscriptionDelete = this.adminService.deletePlace(this.place.id).subscribe({
        next: _value => {
          this.alert.success(`${this.place.name} helyszín sikeresen törölve`);
          this.deleting = false;
          this.router.navigateByUrl("/admin");
        },
        error: _err => {
          this.deleting = false;
        }
      });
    }
  }

  openNewQuestionDialog() {
    this.resetQuestion();
    this.isEditQuestion = false;
    this.editModalVisible = true;
  }

  openEditQuestionDialog(selectedQ: Question) {
    this.selectedQuestion = {...selectedQ};
    console.log("editing: ", this.selectedQuestion);
    this.isEditQuestion = true;
    this.editModalVisible = true;
  }

  editQuestionDialogExited($event: { action: "create" | "delete" | "update", question: Question }) {
    console.log("edited: ", $event.question);
    this.editModalVisible = false;
    console.log($event);
     switch ($event.action) {
       case "create":
         this.place.questions.push($event.question);
         break;
       case "delete":
         const qDelete = this.place.questions.find(x => x.id === $event.question.id);
         if(qDelete) {
           const index = this.place.questions.indexOf(qDelete);
           if (index > -1) {
             this.place.questions.splice(index, 1);
           }
         }
         break;
       case "update":
         const qUpdate = this.place.questions.find(x => x.id === $event.question.id);
         if(qUpdate){
           const index = this.place.questions.indexOf(qUpdate);
           if (index > -1) {
             this.place.questions.splice(index, 1);
           }
           this.place.questions.push($event.question);
         }
         break;
     }
  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe();
    this.subscriptionDelete?.unsubscribe();
  }
}
