import { Component, OnInit } from '@angular/core';
import { ButtonType } from 'src/app/enums/button-type';
import {ListType} from "../../../enums/list-types";
import {Game} from "../../../interfaces/game";
import {AdminService} from "../../../services/AdminService";


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  ButtonType = ButtonType;
  ListType = ListType;

  games: Game[] = []
  EDIT = "EDIT"
  TEAMS = "TEAMS"
  PLACES = "PLACES"
  editModalVisible: boolean = false
  teamsModalVisible: boolean = false
  placesModalVisible: boolean = false

  selectedGame: Game = {applications: [], dateEnd: "", dateStart: "", id: 0, places: [], title: ""}

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllGames().subscribe((res: any) => {
      this.games = res
    })
  }

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

}
