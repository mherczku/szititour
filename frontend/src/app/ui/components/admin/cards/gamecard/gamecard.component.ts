import {ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, signal} from "@angular/core";
import {Game} from "../../../../../types/game";
import {AdminService} from "../../../../../services/AdminService";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {ImgSrcModule} from "../../../../../pipes/img-src/img-src.module";
import {ButtonsComponent} from "../../../buttons/buttons.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationService } from "src/app/services/Notification.service";


@Component({
  selector: "app-gamecard",
  templateUrl: "./gamecard.component.html",
  styleUrls: ["./gamecard.component.scss"],
  imports: [
    FormsModule,
    RouterLink,
    DatePipe,
    ImgSrcModule,
    ButtonsComponent,
    NgIf
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamecardComponent {

  @Input() game: Game = {
    active: false,
    applications: [],
    id: 0,
    img: "assets/img/sample.jpg",
    places: [],
    title: "SampleTitle",
    dateStart: new Date(),
    dateEnd: new Date()
  };
  @Output() onEditClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onTeamsClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onPlacesClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onDeleted: EventEmitter<unknown> = new EventEmitter<unknown>();

  $deleting = signal(false);

  constructor(
    private readonly alert: NotificationService,
    private readonly adminService: AdminService,
    private readonly destroyRef: DestroyRef) {
  }

  deleteGame() {
    const sure = window.confirm(`Biztos törlöd a ${this.game.title} játékot?`);
    if (sure) {
      this.$deleting.set(true);
      this.adminService.deleteGame(this.game.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.$deleting.set(false);
          this.alert.success(`${this.game.title} játék sikeresen törölve`);
          this.onDeleted.emit();
        },
        error: () => {
          this.$deleting.set(false);
        }
      });
    }
  }

  get acceptedApplicationsLength(): number {
    return this.game.applications.filter(e => e.accepted === true).length;
  }

  changeGameActivation() {
    this.adminService.changeGameActivation(this.game.id, !this.game.active).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.game = res;
    });
  }
}
