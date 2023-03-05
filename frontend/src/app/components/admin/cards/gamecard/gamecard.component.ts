import {Component, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
import {Game} from "../../../../types/game";
import {HotToastService} from "@ngneat/hot-toast";
import {AdminService} from "../../../../services/AdminService";
import {Subscription} from "rxjs";


@Component({
  selector: "app-gamecard",
  templateUrl: "./gamecard.component.html",
  styleUrls: ["./gamecard.component.css"]
})
export class GamecardComponent implements OnDestroy {

  @Input() game: Game = {applications: [], id: 0, img: "assets/img/sample.jpg", places: [], title: "SampleTitle", dateStart: new Date(), dateEnd: new Date()};
  @Output() onEditClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onTeamsClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onPlacesClicked: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() onDeleted: EventEmitter<unknown> = new EventEmitter<unknown>();

  deleting = false;
  subscriptionDelete?: Subscription;

  constructor(private alert: HotToastService, private adminService: AdminService) {}

  deleteGame() {
    const sure = window.confirm(`Biztos törlöd a ${this.game.title} játékot?`);
    if(sure){
      this.deleting = true;
      this.subscriptionDelete = this.adminService.deleteGame(this.game.id).subscribe({
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

  ngOnDestroy(): void {
    this.subscriptionDelete?.unsubscribe();
  }
}
