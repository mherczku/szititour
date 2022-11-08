import {Component, Input, OnInit} from '@angular/core';
import {ButtonType} from "../../enums/button-type";
import {Game} from "../../interfaces/game";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  ButtonType = ButtonType;

  @Input() isEdit: boolean = true
  @Input() game: Game = {applications: [], dateEnd: "", dateStart: "", id: 0, img: "", places: [], title: "Alma"}

  title: string = this.isEdit ? this.game.title + " szerkesztése" : "Új játék létrehozása"

  constructor() { }

  ngOnInit(): void {

  }

}
