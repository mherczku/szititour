import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Place} from "../../../../types/place";
import {Subscription} from "rxjs";
import {AdminService} from "../../../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";
import {Question} from "../../../../types/question";
import {QuestionType} from "../../../../enums/question-type";
import {ButtonsComponent} from "../../buttons/buttons.component";
import {ModalModule} from "../modal/modal.module";
import {TextInputComponent} from "../inputs/text-input/text-input.component";
import {QuestionComponent} from "../question/question.component";
import {QuestionEditComponent} from "../question-edit/question-edit.component";
import {ImgSrcModule} from "../../../../pipes/img-src/img-src.module";
import {NgForOf} from "@angular/common";
import {myTrackBy} from "../../../../e-functions/extension-functions";
import {PlaceLocationData, PlaceMapMarkerComponent} from "../place-map-marker/place-map-marker.component";

@Component({
  selector: "app-edit-place",
  templateUrl: "./edit-place.component.html",
  styleUrls: ["./edit-place.component.css"],
  imports: [
    ButtonsComponent,
    ModalModule,
    TextInputComponent,
    QuestionComponent,
    QuestionEditComponent,
    ImgSrcModule,
    NgForOf,
    PlaceMapMarkerComponent
  ],
  standalone: true
})
export class EditPlaceComponent implements OnInit, OnDestroy {
  @Input() isEdit = false;
  place!: Place;

  @Input() set setPlace(value: Place) {
    this.place = value;
    this.setMarkerStartPosition();
  }

  @ViewChild("fileInput")
  fileInput?: ElementRef;

  file?: File;

  editModalVisible = false;
  mapModalVisible = false;
  isEditQuestion = false;
  selectedQuestion!: Question;

  saving = false;
  deleting = false;
  subscriptionSave?: Subscription;
  subscriptionDelete?: Subscription;

  changed = false;
  markerStartPosition: { lat: number, lng: number } = {lat: 47.497913, lng: 19.040236};

  constructor(
    private adminService: AdminService,
    private alert: HotToastService,
    private router: Router
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

  setFile(event: any) {
    this.changed = true;
    this.file = event.target.files[0];
  }

  savePlace() {
    if (this.isEdit) {
      this.saving = true;
      this.subscriptionSave = this.adminService.updatePlace(this.place, this.file).subscribe({
        next: value => {
          this.alert.success(`${value.name} helyszín sikeresen frissítve`);
          this.saving = false;
          this.changed = false;
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
          this.changed = false;
          this.router.navigateByUrl(`/admin/place/${value.gameId}/${value.id}`);
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

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe();
    this.subscriptionDelete?.unsubscribe();
  }

  protected readonly myTrackBy = myTrackBy;

  setMarkerStartPosition() {
    this.markerStartPosition = {lat: this.place.latitude, lng: this.place.longitude};
  }
}
