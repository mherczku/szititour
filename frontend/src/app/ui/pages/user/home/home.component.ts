import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserGameCardComponent } from "../../../components/user/cards/user-game-card/user-game-card.component";
import { UserService } from "../../../../services/UserService";
import { Observable } from "rxjs";
import { Game } from "../../../../types/game";
import { AuthService } from "src/app/services/AuthService";

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
  $profile = this.authService.$currentTeamR;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.games = this.userService.getGames();
  }

}
