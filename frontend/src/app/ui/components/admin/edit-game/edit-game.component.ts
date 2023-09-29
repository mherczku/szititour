import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { Game } from "../../../../types/game";
import { Subscription } from "rxjs";
import { AdminService } from "../../../../services/AdminService";
import { HotToastService } from "@ngneat/hot-toast";
import { ModalService } from "../../../../services/ModalService";
import { DateInputComponent } from "../inputs/date-input/date-input.component";
import { TextInputComponent } from "../inputs/text-input/text-input.component";
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { ImgSrcModule } from "../../../../pipes/img-src/img-src.module";
import { ImgLoaderPipe } from "../../../../pipes/img-loader.pipe";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-edit-game",
    templateUrl: "./edit-game.component.html",
    styleUrls: ["./edit-game.component.css"],
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
export class EditGameComponent implements OnDestroy {

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
  subscriptionSave?: Subscription;

  constructor(private adminService: AdminService, private alert: HotToastService, private modalS: ModalService) {
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

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe();
  }

  save() {
    const dateStartNumber: number = isNaN(Date.parse(this.game.dateStart.valueOf().toString())) ? this.game.dateStart.valueOf() : Date.parse(this.game.dateStart.valueOf().toString());
    const dateEndNumber: number = isNaN(Date.parse(this.game.dateEnd.valueOf().toString())) ? this.game.dateEnd.valueOf() : Date.parse(this.game.dateEnd.valueOf().toString());

    if (dateEndNumber > dateStartNumber) {
      if (this.game.title !== "") {
        // edit
        this.saving = true;
        if (this.isEdit) {
          this.subscriptionSave = this.adminService.updateGame(this.game, this.file).subscribe({
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
          this.subscriptionSave = this.adminService.createGame(this.game, this.file).subscribe({
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
        this.alert.warning("A játéknak kell egy név");
      }
    } else {
      this.alert.warning("A játék vége nem lehet a kezdete előtt");
    }

  }

  setFile(file: File) {
    this.file = file;
  }
}
