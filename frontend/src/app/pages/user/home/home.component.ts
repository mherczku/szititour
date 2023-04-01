import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserGameCardComponent} from "../../../components/user/cards/user-game-card/user-game-card.component";
import {UserService} from "../../../services/UserService";
import {Observable} from "rxjs";
import {Game} from "../../../types/game";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, UserGameCardComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent implements OnInit {
  /*@AutoDestroy destroy = new Subject();*/
  games!: Observable<Game[]>;

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.games = this.userService.getGames();
    /*this.userService.getCucc().pipe(takeUntil(this.destroy)).subscribe(
      res => {
        console.log(res)
      }
    )*/

  }

}
