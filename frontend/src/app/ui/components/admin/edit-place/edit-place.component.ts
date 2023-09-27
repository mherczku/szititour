import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit } from "@angular/core";
import { Place } from "../../../../types/place";
import { AdminService } from "../../../../services/AdminService";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";
import { Question } from "../../../../types/question";
import { QuestionType } from "../../../../enums/question-type";
import { ButtonsComponent } from "../../buttons/buttons.component";
import { ModalModule } from "../modal/modal.module";
import { TextInputComponent } from "../inputs/text-input/text-input.component";
import { QuestionComponent } from "../question/question.component";
import { QuestionEditComponent } from "../question-edit/question-edit.component";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { NgForOf } from "@angular/common";
import { myTrackBy } from "../../../../e-functions/extension-functions";
import { PlaceLocationData, PlaceMapMarkerComponent } from "../place-map-marker/place-map-marker.component";
import { CONST_ROUTES } from "src/app/constants/routes.constants";
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-edit-place",
  templateUrl: "./edit-place.component.html",
  styleUrls: ["./edit-place.component.scss"],
  standalone: true,
  imports: [
    ButtonsComponent,
    ModalModule,
    TextInputComponent,
    QuestionComponent,
    QuestionEditComponent,
    ImgSrcModule,
    NgForOf,
    PlaceMapMarkerComponent,
    ImageUploaderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPlaceComponent implements OnInit {
  @Input() isEdit = false;
  place!: Place;

  @Input() set setPlace(value: Place) {
    this.place = value;
    this.setMarkerStartPosition();
  }

  file?: File;

  editModalVisible = false;
  mapModalVisible = false;
  isEditQuestion = false;
  selectedQuestion!: Question;

  saving = false;
  deleting = false;

  changed = false;
  markerStartPosition: { lat: number, lng: number } = { lat: 47.497913, lng: 19.040236 };

  constructor(
    private readonly adminService: AdminService,
    private readonly alert: HotToastService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.resetQuestion();
    this.setMarkerStartPosition();
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

  setFile(file: File) {
    this.changed = true;
    this.file = file;
  }

  savePlace() {
    if (this.isEdit) {
      this.saving = true;
      this.adminService.updatePlace(this.place, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: value => {
          this.alert.success(`${value.name} helyszín sikeresen frissítve`);
          this.saving = false;
          this.changed = false;
          this.place = value;
        },
        error: () => {
          this.saving = false;
        }
      });
    } else {
      this.saving = true;
      this.adminService.addPlaceToGame(this.place, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: value => {
          this.alert.success(`${value.name} helyszín sikeresen létrehozva`);
          this.saving = false;
          this.changed = false;
          this.router.navigateByUrl(`${CONST_ROUTES.admin.place.call}/${value.gameId}/${value.id}`);
        },
        error: () => {
          this.saving = false;
        }
      });
    }
  }

  deletePlace() {
    const sure = window.confirm(`Biztos törlöd a ${this.place.name} helyszínt?`);
    if (sure) {
      this.deleting = true;
      this.adminService.deletePlace(this.place.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.alert.success(`${this.place.name} helyszín sikeresen törölve`);
          this.deleting = false;
          this.router.navigateByUrl(CONST_ROUTES.admin.call);
        },
        error: () => {
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
    this.selectedQuestion = { ...selectedQ };
    this.isEditQuestion = true;
    this.editModalVisible = true;
  }

  editQuestionDialogExited($event: { action: "create" | "delete" | "update", question: Question }) {
    this.editModalVisible = false;
    switch ($event.action) {
      case "create":
        this.place.questions.push($event.question);
        break;
      case "delete":
        // eslint-disable-next-line no-case-declarations
        const qDelete = this.place.questions.find(x => x.id === $event.question.id);
        if (qDelete) {
          const index = this.place.questions.indexOf(qDelete);
          if (index > -1) {
            this.place.questions.splice(index, 1);
          }
        }
        break;
      case "update":
        // eslint-disable-next-line no-case-declarations
        const qUpdate = this.place.questions.find(x => x.id === $event.question.id);
        if (qUpdate) {
          const index = this.place.questions.indexOf(qUpdate);
          if (index > -1) {
            this.place.questions.splice(index, 1);
          }
          this.place.questions.push($event.question);
        }
        break;
    }
  }

  locationDataChanged($event: PlaceLocationData) {
    this.changed = true;
    this.place.longitude = $event.lng;
    this.place.latitude = $event.lat;
    this.place.address = $event.address;
  }

  protected readonly myTrackBy = myTrackBy;

  setMarkerStartPosition() {
    this.markerStartPosition = { lat: this.place.latitude, lng: this.place.longitude };
  }
}
