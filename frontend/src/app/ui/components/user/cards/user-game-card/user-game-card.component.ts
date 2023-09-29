import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Game} from "../../../../../types/game";
import {UserService} from "../../../../../services/UserService";
import {Subject, takeUntil} from "rxjs";
import {AutoDestroy} from "../../../../../decorators/autodestroy.decorator";
import {RouterLink} from "@angular/router";
import {ImgSrcModule} from "../../../../../pipes/img-src/img-src.module";
import { ImgLoaderPipe } from "../../../../../pipes/img-loader.pipe";

@Component({
    selector: "app-user-game-card",
    standalone: true,
    templateUrl: "./user-game-card.component.html",
    styleUrls: ["./user-game-card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterLink, ImgSrcModule, ImgLoaderPipe]
})
export class UserGameCardComponent {
  @Input() game: Game = {
    applications: [],
    dateEnd: new Date(),
    dateStart: new Date(),
    id: 0,
    places: [],
    title: "Test Title",
    active: false
  };

  @AutoDestroy destroy$ = new Subject();

  constructor(private cd: ChangeDetectorRef, private userService: UserService,) {
  }

  applyBtnClicked() {
    if(!this.game.active){
      if (this.game.userApplied === "applied" || this.game.userApplied === "accepted") {
        this.cancelApplicationForGame();
      } else if (this.game.userApplied === "none") {
        this.applyForGame();
      }
      // todo send alert if declined or sth  now btn disabled
    }
  }

  private applyForGame() {
    this.userService.applyForGame(this.game.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        this.game = value;
        this.cd.markForCheck();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private cancelApplicationForGame() {
    this.userService.cancelApplicationForGame(this.game.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        this.game = value;
        this.cd.markForCheck();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
