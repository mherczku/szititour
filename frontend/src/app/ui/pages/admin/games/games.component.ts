import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, Type, WritableSignal, signal } from "@angular/core";
import { Game } from "../../../../types/game";
import { AdminService } from "../../../../services/AdminService";
import { ModalService } from "../../../../services/ModalService";
import { EditGameComponent } from "../../../components/admin/edit-game/edit-game.component";
import { ButtonsComponent } from "../../../components/buttons/buttons.component";
import { GamecardComponent } from "../../../components/admin/cards/gamecard/gamecard.component";
import { ModalModule } from "../../../components/admin/modal/modal.module";
import { ListsComponent } from "../../../components/admin/lists/lists.component";
import { CommonModule, NgForOf } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Application } from "src/app/types/application";


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
    CommonModule,
    ButtonsComponent,
    GamecardComponent,
    ModalModule,
    ListsComponent,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {

  $games = this.adminService.$games;

  $editModalVisible = signal(false);
  $teamsModalVisible = signal(false);
  $placesModalVisible = signal(false);

  $selectedGame: WritableSignal<Game> = signal({ applications: [], id: 0, places: [], active: false, title: "", dateStart: new Date(), dateEnd: new Date() });
  $isGameEditing = signal(false);

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
    this.$editModalVisible.set(false);
    this.getGames();
  }

  changeModal(m: "TEAMS" | "EDIT" | "PLACES", selected: Game) {
    this.$selectedGame.set({ ...selected });
    this.$editModalVisible.set(false);
    this.$teamsModalVisible.set(false);
    this.$placesModalVisible.set(false);
    switch (m) {
      case "EDIT": {
        this.$editModalVisible.set(true);
        break;
      }
      case "TEAMS": {
        this.$teamsModalVisible.set(true);
        break;
      }
      case "PLACES": {
        this.$placesModalVisible.set(true);
        break;
      }
    }
  }

  setApplications(applications: Application[]) {
    this.$selectedGame.update(g => {
      g.applications = applications;
      return g;
    });
    this.$games.update(games => {
      const g = games.find(g => g.id == this.$selectedGame().id);
      if(g) {
        g.applications = applications;
      }
      return games;
    });
  }

}
