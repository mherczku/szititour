import { Component, DestroyRef, OnInit, Type } from "@angular/core";
import { Game } from "../../../../types/game";
import { AdminService } from "../../../../services/AdminService";
import { ModalService } from "../../../../services/ModalService";
import { EditGameComponent } from "../../../components/admin/edit-game/edit-game.component";
import { ButtonsComponent } from "../../../components/buttons/buttons.component";
import { GamecardComponent } from "../../../components/admin/cards/gamecard/gamecard.component";
import { ModalModule } from "../../../components/admin/modal/modal.module";
import { ListsComponent } from "../../../components/admin/lists/lists.component";
import { NgForOf } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


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
export class GamesComponent implements OnInit {
  $games = this.adminService.$games;
  EDIT = "EDIT";
  TEAMS = "TEAMS";
  PLACES = "PLACES";
  editModalVisible = false;
  teamsModalVisible = false;
  placesModalVisible = false;

  selectedGame: Game = { applications: [], id: 0, places: [], active: false, title: "", dateStart: new Date(), dateEnd: new Date() };
  isGameEditing = false;

  constructor(
    private readonly adminService: AdminService,
    private readonly modalService: ModalService,
    private readonly destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.adminService.getAllGames().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  editGame(g: Game) {
    this.modalService.open(EditGameComponent as Type<Component>, { game: g, isEdit: true });
  }

  openNewGameDialog() {
    const newGame = { applications: [], id: 0, places: [], title: "", dateStart: new Date(), dateEnd: new Date() };
    this.modalService.open(EditGameComponent as Type<Component>, { game: newGame, isEdit: false });
  }

  closeEditModal() {
    this.editModalVisible = false;
    this.getGames();
  }

  changeModal(m: string, selected: Game) {
    this.selectedGame = { ...selected };
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

}
