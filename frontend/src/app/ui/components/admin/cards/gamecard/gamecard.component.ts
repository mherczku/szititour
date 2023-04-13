import {Component, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
import {Game} from "../../../../../types/game";
import {HotToastService} from "@ngneat/hot-toast";
import {AdminService} from "../../../../../services/AdminService";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {AutoDestroy} from "../../../../../decorators/autodestroy.decorator";


@Component({
  selector: "app-gamecard",
  templateUrl: "./gamecard.component.html",
  styleUrls: ["./gamecard.component.css"]
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

  deleting = false;
  @AutoDestroy destroy$ = new Subject();

  constructor(private alert: HotToastService, private adminService: AdminService) {
  }

  deleteGame() {
    const sure = window.confirm(`Biztos törlöd a ${this.game.title} játékot?`);
    if (sure) {
      this.deleting = true;
      this.adminService.deleteGame(this.game.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: res => {
          this.deleting = false;
          this.alert.success(`${this.game.title} sikeresen törölve`);
          this.onDeleted.emit();
        },
        error: err => {
          this.deleting = false;
        }
      });
    }
  }

  getAcceptedApplicationsLength() {
    //todo filter data check string? or application
    //this.game.applications.filter(e => e.)
  }

  changeGameActivation() {
    this.adminService.changeGameActivation(this.game.id, !this.game.active).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.game = res;
    });
  }
}
