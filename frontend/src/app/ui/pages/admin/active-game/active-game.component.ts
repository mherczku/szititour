import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {catchError, map, Observable, of, Subject, tap} from "rxjs";
import {GameWithStatuses} from "../../../../types/game";
import {AdminActiveGameService} from "../../../../services/AdminActiveGameService";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GoogleMapsModule} from "@angular/google-maps";


@Component({
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: "./active-game.component.html",
  styleUrls: ["./active-game.component.scss"]
})
export class ActiveGameComponent implements OnInit {

  gameData?: Observable<GameWithStatuses>;
  apiLoaded: Subject<boolean> = new Subject();
  markerPositions: google.maps.LatLngLiteral[] =  [{lat: 47.49, lng: 19.04}];
  center: google.maps.LatLngLiteral = {lat: 47.497913, lng: 19.040236};
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = {draggable: false, optimized: true, title: "Csapat", clickable: true};

  constructor(httpClient: HttpClient, private route: ActivatedRoute, private adminService: AdminActiveGameService) {
    this.apiLoaded.next(false);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQaLf_BsA8vcOgKtG4_yPBj6lxdVUSpuM&callback=gmNoop";
    script.onload = () => {
      this.apiLoaded.next(true);
    };
    document.head.appendChild(script);
    /*this.apiLoaded = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyCQaLf_BsA8vcOgKtG4_yPBj6lxdVUSpuM", "gmNoop")
      .pipe(
        tap(res  =>{
          console.log("maps api: ", res)
        }),
        map(() => true),
        catchError(() => of(true)),
      )*/
  }


  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      const gameId: number = p["id"];
      if (gameId) {
        this.gameData = this.adminService.getGameWithStatusesById(gameId).pipe(tap(res => {
          console.log("gameData:", res)
        }));
      }
    });
  }
}
