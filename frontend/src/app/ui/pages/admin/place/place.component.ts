import {Component, OnDestroy, OnInit} from "@angular/core";
import {Place} from "../../../../types/place";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../../services/AdminService";
import {Observable, Subscription} from "rxjs";
import {EditPlaceComponent} from "../../../components/admin/edit-place/edit-place.component";
import {myTrackBy} from "../../../../e-functions/extension-functions";
import {AsyncPipe, NgForOf} from "@angular/common";
import {PlaceCardComponent} from "../../../components/user/place-card/place-card.component";
import {Game} from "../../../../types/game";
import {ConvertToActivePlacePipe} from "../../../../pipes/place-to-active/convert-to-active-place.pipe";

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
    ConvertToActivePlacePipe
  ]
})
export class PlaceComponent implements OnInit, OnDestroy {

  place: Place = {
    id: 0,
    name: "Helyszín neve",
    img: "",
    gameId: 0,
    address: "Helyszín címe",
    latitude: 0,
    longitude: 0,
    questions: []
  };

  placeId = 0;
  isEdit = true;

  subscriptionGet?: Subscription;

  currentGame$?: Observable<Game>;

  constructor(private route: ActivatedRoute, private adminService: AdminService) {
  }

  selectPlace(place: Place) {
    this.place = place;
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const placeId = p["placeId"];
      const gameId: number = p["gameId"];
      if (placeId === "new") {
        this.isEdit = false;
        this.placeId = 0;
        this.place = {
          id: 0,
          name: "Helyszín neve",
          img: "",
          gameId: gameId,
          address: "Helyszín címe",
          latitude: 0,
          longitude: 0,
          questions: []
        };

      } else {
        this.placeId = placeId;
        this.isEdit = true;
        this.getPlace();
        this.getGame(gameId);
      }

    });
  }

  getGame(id: number) {
    this.currentGame$ = this.adminService.getGameById(id);
  }

  getPlace(): void {
    this.subscriptionGet = this.adminService.getPlaceById(this.placeId).subscribe({
      next: value => {
        this.place = value;
      },
      error: _err => {
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionGet?.unsubscribe();
  }

  protected readonly myTrackBy = myTrackBy;
}
