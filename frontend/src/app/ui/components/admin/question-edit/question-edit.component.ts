import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import {Question} from "../../../../types/question";
import {QuestionType} from "../../../../enums/question-type";
import {AdminService} from "../../../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";
import {FormsModule} from "@angular/forms";
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";
import { CommonModule } from "@angular/common";

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
  @Output() onExit: EventEmitter<{ action: "create" | "delete" | "update", question: Question }> = new EventEmitter();

  saving = false;
  deleting = false;

  file?: File;

  constructor(
    private readonly adminService: AdminService,
    private readonly alert: HotToastService,
    private readonly destroyRef: DestroyRef) {}


  save() {
    if (this.isEdit) {
      console.log(this.question.riddle, "saving");
      this.saving = true;
      this.adminService.updateQuestion(this.question, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: value => {
          this.alert.success("Kérdés sikeresen frissítve");
          this.saving = false;
          this.onExit.emit({action: "update", question: value});
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
          this.onExit.emit({action: "create", question: value});
        },
        error: () => {
          this.saving = false;
        }
      });
    }
  }

  delete() {
    const sure = window.confirm("Biztos törlöd ezt a kérdést?");
    if (sure) {
      this.deleting = true;
      this.adminService.deleteQuestion(this.question.id).subscribe({
        next: () => {
          this.alert.success("Kérdés sikeresen törölve");
          this.deleting = false;
          this.onExit.emit({action: "delete", question: this.question});
        },
        error: () => {
          this.deleting = false;
        }
      });
    }
  }

  setFile(file: File) {
    this.file = file;
  }
}
