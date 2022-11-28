import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonType} from "../../enums/button-type";
import {Game} from "../../interfaces/game";
import {Subscription} from "rxjs";
import {AdminService} from "../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;

  @Input() isEdit: boolean = true
  @Input() game: Game = {
    applications: [],
    id: 0,
    img: "",
    places: [],
    title: "",
    dateStart: new Date(),
    dateEnd: new Date()
  }
  @Output() onClose: EventEmitter<unknown> = new EventEmitter<unknown>()

  title: string = this.isEdit ? this.game.title + " szerkesztése" : "Új játék létrehozása"
  saving: boolean = false;
  subscriptionSave?: Subscription

  constructor(private adminService: AdminService, private alert: HotToastService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe()
  }

  save() {

    if (this.game.title !== "") {
      // edit
      this.saving = true
      if (this.isEdit) {
        this.subscriptionSave = this.adminService.updateGame(this.game).subscribe({
          next: (res) => {
            if (res) {
              this.alert.success(`${res.title} successfully updated`)
              this.saving = false
              this.onClose.emit()
            }
          },
          error: err => {
            this.saving = false
          }
        })
      }

      //create new
      else {
        this.subscriptionSave = this.adminService.createGame(this.game).subscribe({
          next: (res) => {
            if (res) {
              this.alert.success(`${res.title} successfully created`)
              this.saving = false
              this.onClose.emit()
            }
          },
          error: err => {
            this.saving = false
          }
        })
      }
    } else {
      this.alert.warning("Game must have a name")
    }

  }
}
