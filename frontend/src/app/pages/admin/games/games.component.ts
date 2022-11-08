import { Component, OnInit } from '@angular/core';
import { ButtonType } from 'src/app/enums/button-type';
import {ListType} from "../../../enums/list-types";
import {Game} from "../../../interfaces/game";


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  ButtonType = ButtonType;
  ListType = ListType;

  games: Game[] = [
    {applications: ["t1", "t2"], dateEnd: "2020.10.10", dateStart: "2020.10.10", id: 5, img: "assets/img/sample.jpg", places: ["p1", "p2"], title: "SampleTitle"},
    {applications: [], dateEnd: "", dateStart: "", id: 1, places: [], title: ""},
    {applications: [], dateEnd: "", dateStart: "", id: 2, places: [], title: ""},
    {applications: [], dateEnd: "", dateStart: "", id: 3, places: [], title: ""},
    {applications: [], dateEnd: "", dateStart: "", id: 4, places: [], title: ""}

  ]
  EDIT = "EDIT"
  TEAMS = "TEAMS"
  PLACES = "PLACES"
  editModalVisible: boolean = false
  teamsModalVisible: boolean = false
  placesModalVisible: boolean = false

  selectedGame: Game = {applications: [], dateEnd: "", dateStart: "", id: 0, places: [], title: ""}

  editGame(g: Game) {
    this.selectedGame = g
    this.changeModal(this.EDIT)
  }

  changeModal(m: string) {
    this.editModalVisible = false
    this.teamsModalVisible = false
    this.placesModalVisible = false
    switch (m) {
      case this.EDIT: {
        this.editModalVisible = true
        break;
      }
      case this.TEAMS: {
        this.teamsModalVisible = true
        break;
      }
      case this.PLACES: {
        this.placesModalVisible = true
        break;
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
