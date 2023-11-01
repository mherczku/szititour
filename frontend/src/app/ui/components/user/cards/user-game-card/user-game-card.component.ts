import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, Signal, WritableSignal, computed, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Game } from "../../../../../types/game";
import { UserService } from "../../../../../services/UserService";
import { RouterLink } from "@angular/router";
import { ImgSrcModule } from "../../../../../pipes/img-src/img-src.module";
import { ImgLoaderPipe } from "../../../../../pipes/img-loader.pipe";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-user-game-card",
  standalone: true,
  templateUrl: "./user-game-card.component.html",
  styleUrls: ["./user-game-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ImgSrcModule, ImgLoaderPipe]
})
export class UserGameCardComponent {


  @Input({ required: true }) set game(value: Game) {
    this.$game.set(value);
  }

  $game: WritableSignal<Game> = signal({
    applications: [],
    dateEnd: new Date(),
    dateStart: new Date(),
    id: 0,
    places: [],
    title: "Test Title",
    active: false
  });

  $btnType: Signal<string> = computed(() => {
    const g = this.$game();
    if(g.active) {
      if(g.userApplied === "accepted") {
        return "GREEN";
      } else if(g.userApplied === "applied") {
        return "DISABLED";
      } else if(g.userApplied === "declined"){
        return "DISABLED";
      } else {
        return "DISABLED";
      }
    } else {
      if(g.userApplied === "accepted") {
        return "RED";
      } else if(g.userApplied === "applied") {
        return "RED";
      } else if(g.userApplied === "declined"){
        return "DISABLED";
      } else {
        return "GREEN";
      }
    }
  });

  $btnText: Signal<string> = computed(() => {
    const g = this.$game();
    if(g.active) {
      if(g.userApplied === "accepted") {
        return "Írány a játék";
      } else if(g.userApplied === "applied") {
        return "Aktív játék";
      } else if(g.userApplied === "declined"){
        return "Elutasítva";
      } else {
        return "Aktív játék";
      }
    } else {
      if(g.userApplied === "accepted") {
        return "Elfogadva - visszavonás";
      } else if(g.userApplied === "applied") {
        return "Visszavonás";
      } else if(g.userApplied === "declined"){
        return "Elutasítva";
      } else {
        return "Jelentkezés";
      }
    }
  });

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly userService: UserService,
    private readonly destroyRef: DestroyRef) { }

  applyBtnClicked() {
    if (!this.$game().active) {
      if (this.$game().userApplied === "applied" || this.$game().userApplied === "accepted") {
        this.cancelApplicationForGame();
      } else if (this.$game().userApplied === "none") {
        this.applyForGame();
      }
    }
  }

  private applyForGame() {
    this.userService.applyForGame(this.$game().id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        this.game = value;
        this.cd.markForCheck();
      }
    });
  }

  private cancelApplicationForGame() {
    this.userService.cancelApplicationForGame(this.$game().id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        this.game = value;
        this.cd.markForCheck();
      }
    });
  }
}
