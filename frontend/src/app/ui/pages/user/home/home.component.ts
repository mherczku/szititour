import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserGameCardComponent} from "../../../components/user/cards/user-game-card/user-game-card.component";
import {UserService} from "../../../../services/UserService";
import {Observable} from "rxjs";
import {Game} from "../../../../types/game";
import {Store} from "@ngrx/store";
import {selectLoggedInTeam} from "../../../../store/selectors/auth.selector";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, UserGameCardComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent implements OnInit {
  
  games!: Observable<Game[]>;
  profile = this.store.select(selectLoggedInTeam);

  constructor(private store: Store, private userService: UserService) {
  }


  ngOnInit(): void {
    this.games = this.userService.getGames();
  }

}
