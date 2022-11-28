import {Component, OnDestroy, OnInit} from '@angular/core';
import { ButtonType } from 'src/app/enums/button-type';
import {ListType} from "../../../enums/list-types";
import {Game} from "../../../interfaces/game";
import {AdminService} from "../../../services/AdminService";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;
  ListType = ListType;

  games: Game[] = []
  EDIT = "EDIT"
  TEAMS = "TEAMS"
  PLACES = "PLACES"
  editModalVisible: boolean = false
  teamsModalVisible: boolean = false
  placesModalVisible: boolean = false

  selectedGame: Game = {applications: [], id: 0, places: [], title: "", dateStart: new Date(), dateEnd: new Date()}
  isGameEditing: boolean = false

  subscriptionGetGames?: Subscription

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getGames()
  }

  getGames() {
    this.subscriptionGetGames = this.adminService.getAllGames().subscribe((res: any) => {
      this.games = res
      console.log(this.games)

    })
  }

  editGame(g: Game) {
    this.isGameEditing = true
    this.changeModal(this.EDIT, g)
  }

  openNewGameDialog() {
    const newGame = {applications: [], id: 0, places: [], title: "", dateStart: new Date(), dateEnd: new Date()}
    this.isGameEditing = false
    this.changeModal(this.EDIT, newGame)
  }

  closeEditModal() {
    this.editModalVisible = false
    this.getGames()
  }

  changeModal(m: string, selected: Game) {
    this.selectedGame = selected
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

  ngOnDestroy(): void {
    this.subscriptionGetGames?.unsubscribe()
  }
}
