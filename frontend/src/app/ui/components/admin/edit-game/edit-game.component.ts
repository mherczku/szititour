import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Game } from "../../../../types/game";
import { AdminService } from "../../../../services/AdminService";
import { ModalService } from "../../../../services/ModalService";
import { DateInputComponent } from "../inputs/date-input/date-input.component";
import { TextInputComponent } from "../inputs/text-input/text-input.component";
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";
import { CommonModule } from "@angular/common";
import { NotificationService } from "src/app/services/Notification.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-edit-game",
  templateUrl: "./edit-game.component.html",
  styleUrls: ["./edit-game.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DateInputComponent,
    TextInputComponent,
    ImageUploaderComponent,
    ImgSrcModule,
    ImgLoaderPipe,
    CommonModule
  ]
})
export class EditGameComponent {

  file?: File;

  @Input() isEdit = true;
  @Input() game: Game = {
    applications: [],
    id: 0,
    img: "",
    places: [],
    title: "alma",
    dateStart: new Date(),
    dateEnd: new Date(),
    active: false
  };
  @Output() onClose: EventEmitter<unknown> = new EventEmitter<unknown>();

  public setGame(data: { game: Game, isEdit: boolean }) {
    this.game = data.game;
    this.isEdit = data.isEdit;
  }

  saving = false;

  constructor(
    private readonly adminService: AdminService,
    private readonly alert: NotificationService,
    private readonly modalS: ModalService,
    private readonly destroyRef: DestroyRef) {

    const a = this.modalS.getExtra() as { game: Game, isEdit: boolean };
    if (a !== undefined) {
      this.setGame(a);
    }
  }

  close() {
    this.resetFields();
    this.onClose.emit();
    this.modalS.close();
  }

  resetFields() {
    this.game = {
      applications: [],
      id: 0,
      img: "",
      places: [],
      title: "",
      dateStart: new Date(),
      dateEnd: new Date(),
      active: false
    };
    this.file = undefined;

  }

  save() {
    const dateStartNumber: number = isNaN(Date.parse(this.game.dateStart.valueOf().toString())) ? this.game.dateStart.valueOf() : Date.parse(this.game.dateStart.valueOf().toString());
    const dateEndNumber: number = isNaN(Date.parse(this.game.dateEnd.valueOf().toString())) ? this.game.dateEnd.valueOf() : Date.parse(this.game.dateEnd.valueOf().toString());

    if (dateEndNumber > dateStartNumber) {
      if (this.game.title !== "") {
        // edit
        this.saving = true;
        if (this.isEdit) {
          this.adminService.updateGame(this.game, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (res) => {
              if (res) {
                this.alert.success(`${res.title} sikeresen frissítve`);
                this.saving = false;
                this.close();
              }
            },
            error: () => {
              this.saving = false;
            }
          });
        }

        //create new
        else {
          this.adminService.createGame(this.game, this.file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (res) => {
              if (res) {
                this.alert.success(`${res.title} sikeresen létrehozva`);
                this.saving = false;
                this.close();
              }
            },
            error: () => {
              this.saving = false;
            }
          });
        }
      } else {
        this.alert.error("A játéknak kell egy név");
      }
    } else {
      this.alert.error("A játék vége nem lehet a kezdete előtt");
    }

  }

  setFile(file: File) {
    this.file = file;
  }
}
