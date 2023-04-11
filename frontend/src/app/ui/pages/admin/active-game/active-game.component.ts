import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, tap} from "rxjs";
import {GameWithStatuses} from "../../../../types/game";
import {AdminActiveGameService} from "../../../../services/AdminActiveGameService";
import {ActivatedRoute} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./active-game.component.html",
  styleUrls: ["./active-game.component.scss"]
})
export class ActiveGameComponent implements OnInit {

  gameData?: Observable<GameWithStatuses>;

  constructor(private route: ActivatedRoute, private adminService: AdminActiveGameService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      const gameId: number = p["id"];
      if (gameId) {
        this.gameData = this.adminService.getGameWithStatusesById(gameId).pipe(tap(res => {
          console.log("gameData:", res)
        }));
      }
    });
  }
}
