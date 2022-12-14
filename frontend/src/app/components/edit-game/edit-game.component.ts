import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
export class EditGameComponent implements OnInit, OnChanges, OnDestroy {

  ButtonType = ButtonType;

  file?: File

  @ViewChild('fileInput')
  fileInput?: ElementRef

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


  saving: boolean = false;
  subscriptionSave?: Subscription

  constructor(private adminService: AdminService, private alert: HotToastService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fileInput?.nativeElement?.value ? this.fileInput.nativeElement.value = null : undefined
  }

  ngOnInit(): void {

  }

  close() {
    this.resetFields()
    this.onClose.emit()
  }

  resetFields() {
    this.game = {
      applications: [],
      id: 0,
      img: "",
      places: [],
      title: "",
      dateStart: new Date(),
      dateEnd: new Date()
    }
    this.file = undefined
    this.fileInput?.nativeElement?.value ? this.fileInput.nativeElement.value = null : undefined

  }

  ngOnDestroy(): void {
    this.subscriptionSave?.unsubscribe()
  }

  save() {
    const dateStartNumber: number =  isNaN(Date.parse(this.game.dateStart.valueOf().toString())) ? this.game.dateStart.valueOf() : Date.parse(this.game.dateStart.valueOf().toString())
    const dateEndNumber: number = isNaN(Date.parse(this.game.dateEnd.valueOf().toString())) ? this.game.dateEnd.valueOf() : Date.parse(this.game.dateEnd.valueOf().toString())

    console.log(dateEndNumber, '>' ,dateStartNumber, dateEndNumber > dateStartNumber)
    if(dateEndNumber > dateStartNumber) {
      if (this.game.title !== "") {
        // edit
        this.saving = true
        if (this.isEdit) {
          this.subscriptionSave = this.adminService.updateGame(this.game, this.file).subscribe({
            next: (res) => {
              if (res) {
                this.alert.success(`${res.title} sikeresen friss??tve`)
                this.saving = false
                this.close()
              }
            },
            error: _err => {
              this.saving = false
            }
          })
        }

        //create new
        else {
          this.subscriptionSave = this.adminService.createGame(this.game, this.file).subscribe({
            next: (res) => {
              if (res) {
                this.alert.success(`${res.title} sikeresen l??trehozva`)
                this.saving = false
                this.close()
              }
            },
            error: _err => {
              this.saving = false
            }
          })
        }
      } else {
        this.alert.warning("A j??t??knak kell egy n??v")
      }
    } else {
      this.alert.warning("A j??t??k v??ge nem lehet a kezdete el??tt")
    }

  }

  setFile(event: any) {
    this.file = event.target.files[0]
  }
}
