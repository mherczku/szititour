import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Game} from "../../../../types/game";
import {UserService} from "../../../../services/UserService";
import {Subject, takeUntil} from "rxjs";
import {AutoDestroy} from "../../../../decorators/autodestroy.decorator";

@Component({
  selector: "app-user-game-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-game-card.component.html",
  styleUrls: ["./user-game-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGameCardComponent {
  @Input() game: Game = {
    applications: [],
    dateEnd: new Date(),
    dateStart: new Date(),
    id: 0,
    places: [],
    title: "Test Title"
  };

  @AutoDestroy destroy$ = new Subject();

  constructor(private cd: ChangeDetectorRef, private userService: UserService,) {
  }

  applyBtnClicked() {
    if (this.game.userApplied) {
      this.cancelApplicationForGame();
    } else if (!this.game.userApplied) {
      this.applyForGame();
    }
  }

  private applyForGame() {
    this.userService.applyForGame(this.game.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        console.log(value);
        if (value.success) {
          this.game.userApplied = true;
        } else {
          this.game.userApplied = true;
        }
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
        if (value.success) {
          this.game.userApplied = false;
        }
        this.cd.markForCheck();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
