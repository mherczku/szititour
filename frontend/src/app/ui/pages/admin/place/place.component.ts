import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit } from "@angular/core";
import { Place } from "../../../../types/place";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AdminService } from "../../../../services/AdminService";
import { Observable } from "rxjs";
import { EditPlaceComponent } from "../../../components/admin/edit-place/edit-place.component";
import { myTrackBy } from "../../../../e-functions/extension-functions";
import { AsyncPipe, NgForOf } from "@angular/common";
import { PlaceCardComponent } from "../../../components/user/place-card/place-card.component";
import { Game } from "../../../../types/game";
import { ConvertToActivePlacePipe } from "../../../../pipes/place-to-active/convert-to-active-place.pipe";
import { ButtonsComponent } from "../../../components/buttons/buttons.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-place",
  templateUrl: "./place.component.html",
  styleUrls: ["./place.component.scss"],
  standalone: true,
  styles: [`
    :host {
      display: flex;
      flex-grow: 1;
    }
    `],
  imports: [
    EditPlaceComponent,
    AsyncPipe,
    NgForOf,
    PlaceCardComponent,
    ConvertToActivePlacePipe,
    ButtonsComponent,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent implements OnInit {

  protected readonly myTrackBy = myTrackBy;

  place: Place = {
    id: 0,
    name: "Helyszín neve",
    img: "",
    gameId: 0,
    address: "Helyszín címe",
    latitude: 47.49,
    longitude: 19.04,
    questions: []
  };

  placeId = 0;
  gameId = 0;
  isEdit = true;

  currentGame$?: Observable<Game>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminService: AdminService,
    private readonly destroyRef: DestroyRef) {
  }

  selectPlace(place: Place) {
    this.place = place;
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const placeId = p["placeId"];
      this.gameId = p["gameId"];
      if (placeId === "new") {
        this.isEdit = false;
        this.placeId = 0;
        this.place = {
          id: 0,
          name: "Helyszín neve",
          img: "",
          gameId: this.gameId,
          address: "Helyszín címe",
          latitude: 47.49,
          longitude: 19.04,
          questions: []
        };

      } else {
        this.placeId = placeId;
        this.isEdit = true;
        this.getPlace();
      }
      this.getGame();

    });
  }

  getGame() {
    this.currentGame$ = this.adminService.getGameById(this.gameId);
  }

  getPlace(): void {
    this.adminService.getPlaceById(this.placeId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        this.place = value;
      }
    });
  }

}
