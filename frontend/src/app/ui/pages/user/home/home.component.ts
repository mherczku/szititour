import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserGameCardComponent } from "../../../components/user/cards/user-game-card/user-game-card.component";
import { UserService } from "../../../../services/UserService";
import { Observable, tap } from "rxjs";
import { Game } from "../../../../types/game";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, UserGameCardComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

  games!: Observable<Game[]>;
  $games: WritableSignal<Game[]> = signal([]);
  constructor(
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.games = this.userService.getGames().pipe(tap(games => {
      this.$games.set(games);
    }));
  }

}
