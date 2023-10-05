import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, WritableSignal, computed, signal } from "@angular/core";
import { Game } from "../../../../../types/game";
import { AdminService } from "../../../../../services/AdminService";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CommonModule, DatePipe, NgIf } from "@angular/common";
import { ImgSrcModule } from "../../../../../pipes/img-src/img-src.module";
import { ButtonsComponent } from "../../../buttons/buttons.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationService } from "src/app/services/Notification.service";
import { ImgLoaderPipe } from "../../../../../pipes/img-loader.pipe";
import { ConfirmService } from "src/app/services/Confirm.service";

@Component({
  selector: "app-gamecard",
  templateUrl: "./gamecard.component.html",
  styleUrls: ["./gamecard.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatePipe,
    ImgSrcModule,
    ButtonsComponent,
    NgIf,
    ImgLoaderPipe
  ]
})
export class GamecardComponent {

  $game: WritableSignal<Game> = signal({
    active: false,
    applications: [],
    id: 0,
    img: "assets/img/sample.jpg",
    places: [],
    title: "SampleTitle",
    dateStart: new Date(),
    dateEnd: new Date()
  });

  $acceptedSize = computed(() => {
    return this.$game().applications.filter(e => e.accepted === true).length;
  });

  @Input({required: true}) set game(value: Game) {
    console.log("INPUT GAMECARD GAME:", value)
    this.$game.set(value);
  }
  @Output() onEditClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onTeamsClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onPlacesClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onDeleted: EventEmitter<unknown> = new EventEmitter<unknown>();

  $deleting = signal(false);

  constructor(
    private readonly alert: NotificationService,
    private readonly adminService: AdminService,
    private readonly destroyRef: DestroyRef,
    private readonly confirmS: ConfirmService) {
  }

  deleteGame() {
    this.confirmS.confirm(
      {
        question: `Biztos törlöd a ${this.$game().title} játékot?`,
        confirmText: "Törlés"
      },
      () => {
        this.$deleting.set(true);
        this.adminService.deleteGame(this.$game().id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: () => {
            this.$deleting.set(false);
            this.alert.success(`${this.$game().title} játék sikeresen törölve`);
            this.onDeleted.emit();
          },
          error: () => {
            this.$deleting.set(false);
          }
        });
      });
  }

  changeGameActivation() {
    this.confirmS.confirm(
      {
        question: `Biztos ${this.$game().active ? "leállítod" : "elindítod"} a játékot? ${this.$game().active ? "Leállítással törlöd az aktív játék állapotát!" : ""}`
      },
      () => {
        this.adminService.changeGameActivation(this.$game().id, !this.$game().active).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
          this.game = res;
        });
      });

  }
}
