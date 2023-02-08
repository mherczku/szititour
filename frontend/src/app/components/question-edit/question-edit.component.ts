import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {Question} from "../../interfaces/question";
import {QuestionType} from "../../enums/question-type";
import {ButtonType} from "../../enums/button-type";
import {Subscription} from "rxjs";
import {AdminService} from "../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: "app-question-edit",
  templateUrl: "./question-edit.component.html",
  styleUrls: ["./question-edit.component.sass"]
})
export class QuestionEditComponent implements OnChanges, OnDestroy {

  ButtonType = ButtonType;

  @ViewChild("fileInput")
  fileInput?: ElementRef;

  @Input() isEdit = false;
  @Input() question: Question = {
    id: 0,
    img: "",
    name: "",
    type: QuestionType.shortText,
    placeId: 1,
    riddle: false
  };
  @Output() onExit: EventEmitter<{ action: "create" | "delete" | "update", question: Question }> = new EventEmitter();

  saving = false;
  deleting = false;
  subscriptionSave?: Subscription;
  subscriptionDelete?: Subscription;

  file?: File;

  constructor(private adminService: AdminService, private alert: HotToastService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fileInput?.nativeElement.value ? this.fileInput.nativeElement.value = null : undefined;
  }

  save() {
    if (this.isEdit) {
      console.log(this.question.riddle, "saving");
      this.saving = true;
      this.subscriptionSave = this.adminService.updateQuestion(this.question, this.file).subscribe({
        next: value => {
          this.alert.success("Kérdés sikeresen frissítve");
          this.saving = false;
          this.fileInput?.nativeElement.value ? this.fileInput.nativeElement.value = null : undefined;
          this.onExit.emit({action: "update", question: value});
        },
        error: err => {
          this.saving = false;
        }
      });
    } else {
      this.saving = true;
      this.subscriptionSave = this.adminService.createQuestion(this.question, this.file).subscribe({
        next: value => {
          this.alert.success("Kérdés sikeresen létrehozva");
          this.saving = false;
          this.fileInput?.nativeElement.value ? this.fileInput.nativeElement.value = null : undefined;
          this.onExit.emit({action: "create", question: value});
        },
        error: err => {
          this.saving = false;
        }
      });
    }
  }

  delete() {
    const sure = window.confirm("Biztos törlöd ezt a kérdést?");
    if (sure) {
      this.deleting = true;
      this.subscriptionDelete = this.adminService.deleteQuestion(this.question.id).subscribe({
        next: value => {
          this.alert.success("Kérdés sikeresen törölve");
          this.deleting = false;
          this.onExit.emit({action: "delete", question: this.question});
        },
        error: err => {
          this.deleting = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe();
    this.subscriptionDelete?.unsubscribe();
  }

  setFile(event: any) {
    this.file = event.target.files[0];
  }
}
