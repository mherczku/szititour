import {Component, OnDestroy, OnInit} from "@angular/core";
import {Place} from "../../../../types/place";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../../services/AdminService";
import {Subscription} from "rxjs";

@Component({
  selector: "app-place",
  templateUrl: "./place.component.html",
  styleUrls: ["./place.component.css"],
  styles: [`
    :host {
      display: flex;
      flex-grow: 1;
    }
  `],
})
export class PlaceComponent implements OnInit, OnDestroy {

  place: Place = {
    id: 0,
    name: "Helyszín neve",
    img: "",
    gameId: 0,
    address: "Helyszín címe",
    latitude: "0",
    longitude: "0",
    questions: []
  };

  placeId = 0;
  isEdit = true;

  subscriptionGet?: Subscription;

  constructor(private route: ActivatedRoute, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const placeId = p["placeId"];
      const gameId = p["gameId"];
      if (placeId === "new") {
        this.isEdit = false;
        this.placeId = 0;
        this.place = {
          id: 0,
          name: "Helyszín neve",
          img: "",
          gameId: gameId,
          address: "Helyszín címe",
          latitude: "0",
          longitude: "0",
          questions: []
        };

      } else {
        this.placeId = placeId;
        this.isEdit = true;
        this.getPlace();
      }

    });
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

}
