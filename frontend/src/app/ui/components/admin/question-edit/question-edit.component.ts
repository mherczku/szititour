import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { Question } from "../../../../types/question";
import { QuestionType } from "../../../../enums/question-type";
import { AdminService } from "../../../../services/AdminService";
import { FormsModule } from "@angular/forms";
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";
import { CommonModule } from "@angular/common";
import { ConfirmService } from "src/app/services/Confirm.service";
import { NotificationService } from "src/app/services/Notification.service";

@Component({
  selector: "app-question-edit",
  templateUrl: "./question-edit.component.html",
  styleUrls: ["./question-edit.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ImageUploaderComponent,
    ImgSrcModule,
    ImgLoaderPipe,
    CommonModule
  ]
})
export class QuestionEditComponent {

  @Input() isEdit = false;
  @Input() question: Question = {
    id: 0,
    img: "",
    name: "",
    type: QuestionType.shortText,
    placeId: 1,
    riddle: false
  };
  @Output() exit: EventEmitter<{ action: "create" | "delete" | "update", question: Question }> = new EventEmitter();

  saving = false;
  deleting = false;

  file?: File;

  constructor(
    private readonly adminService: AdminService,
    private readonly alert: NotificationService,
    private readonly destroyRef: DestroyRef,
    private readonly confirmS: ConfirmService) { }


  save() {
    if (this.isEdit) {
      console.log(this.question.riddle, "saving");
      this.saving = true;
      this.adminService.updateQuestion(this.question, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: value => {
          this.alert.success("Kérdés sikeresen frissítve");
          this.saving = false;
          this.exit.emit({ action: "update", question: value });
        },
        error: () => {
          this.saving = false;
        }
      });
    } else {
      this.saving = true;
      this.adminService.createQuestion(this.question, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: value => {
          this.alert.success("Kérdés sikeresen létrehozva");
          this.saving = false;
          this.exit.emit({ action: "create", question: value });
        },
        error: () => {
          this.saving = false;
        }
      });
    }
  }

  delete() {
    this.confirmS.confirm(
      {
        question: "Biztos törlöd ezt a kérdést?",
        confirmText: "Törlés"
      },
      () => {
        this.deleting = true;
        this.adminService.deleteQuestion(this.question.id).subscribe({
          next: () => {
            this.alert.success("Kérdés sikeresen törölve");
            this.deleting = false;
            this.exit.emit({ action: "delete", question: this.question });
          },
          error: () => {
            this.deleting = false;
          }
        });
      }
    );
  }

  setFile(file: File) {
    this.file = file;
  }
}
