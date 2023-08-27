import {Component, OnDestroy, OnInit, Type} from "@angular/core";
import {Game} from "../../../../types/game";
import {AdminService} from "../../../../services/AdminService";
import {Subscription} from "rxjs";
import {ModalService} from "../../../../services/ModalService";
import {EditGameComponent} from "../../../components/admin/edit-game/edit-game.component";
import {ButtonsComponent} from "../../../components/buttons/buttons.component";
import {GamecardComponent} from "../../../components/admin/cards/gamecard/gamecard.component";
import {ModalModule} from "../../../components/admin/modal/modal.module";
import {ListsComponent} from "../../../components/admin/lists/lists.component";
import {NgForOf} from "@angular/common";


@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"],
  standalone: true,
  styles: [`
    :host {
      display: flex;
      flex-grow: 1;
    }
  `],
  imports: [
    ButtonsComponent,
    GamecardComponent,
    ModalModule,
    ListsComponent,
    NgForOf
  ]
})
export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  EDIT = "EDIT";
  TEAMS = "TEAMS";
  PLACES = "PLACES";
  editModalVisible = false;
  teamsModalVisible = false;
  placesModalVisible = false;

  selectedGame: Game = {applications: [], id: 0, places: [], active: false, title: "", dateStart: new Date(), dateEnd: new Date()};
  isGameEditing = false;

  subscriptionGetGames?: Subscription;

  constructor(private adminService: AdminService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.subscriptionGetGames = this.adminService.getAllGames().subscribe((res: any) => {
      this.games = res;
    });
  }

  editGame(g: Game) {
    this.modalService.open(EditGameComponent as Type<Component>,{game: g, isEdit: true});
    //this.isGameEditing = true;
    //this.changeModal(this.EDIT, g);
  }

  openNewGameDialog() {
    const newGame = {applications: [], id: 0, places: [], title: "", dateStart: new Date(), dateEnd: new Date()};
    this.modalService.open(EditGameComponent as Type<Component>,{game: newGame, isEdit: false});
  }

  closeEditModal() {
    this.editModalVisible = false;
    this.getGames();
  }

  changeModal(m: string, selected: Game) {
    this.selectedGame = {...selected};
    this.editModalVisible = false;
    this.teamsModalVisible = false;
    this.placesModalVisible = false;
    switch (m) {
      case this.EDIT: {
        this.editModalVisible = true;
        break;
      }
      case this.TEAMS: {
        this.teamsModalVisible = true;
        break;
      }
      case this.PLACES: {
        this.placesModalVisible = true;
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptionGetGames?.unsubscribe();
  }

}
