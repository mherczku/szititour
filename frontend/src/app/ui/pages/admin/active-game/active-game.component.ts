import {Component, OnInit, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, Subject, tap} from "rxjs";
import {GameWithStatuses} from "../../../../types/game";
import {AdminActiveGameService} from "../../../../services/AdminActiveGameService";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GoogleMapsModule, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {PlaceStatusDto, TeamGameStatus} from "../../../../types/team-game-status";
import {AnswerComponent} from "../../../components/admin/answer/answer.component";
import {Place} from "../../../../types/place";
import {myTrackBy} from "../../../../e-functions/extension-functions";
import {environment} from "../../../../../environments/environment";


type GameMarker = {
  position: google.maps.LatLngLiteral
  option: google.maps.MarkerOptions
  infoPlace?: { id: number, placeName: string, teams: { teamName: string, reached: Date }[] }
  infoTeam?: { teamName: string, date: Date }
}

@Component({
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, FormsModule, AnswerComponent],
  templateUrl: "./active-game.component.html",
  styleUrls: ["./active-game.component.scss"]
})
export class ActiveGameComponent implements OnInit {

  gameData?: Observable<GameWithStatuses>;
  apiLoaded: Subject<boolean> = new Subject();

  gameMarkers: GameMarker[] = [];

  mapOption: google.maps.MapOptions = {streetViewControl: false};

  markerPositions: google.maps.LatLngLiteral[] = [{lat: 47.49, lng: 19.04}];
  markerOptions: google.maps.MarkerOptions = {draggable: false, optimized: true, title: "Csapat", clickable: true};

  center: google.maps.LatLngLiteral = {lat: 47.497913, lng: 19.040236};
  zoom = 11;

  selectedMarker?: GameMarker;
  selectedTeamStatus?: TeamGameStatus;
  selectedTeamPlace?: PlaceStatusDto;
  private gameStatuses: TeamGameStatus[] = [];
  private places: Place[] = [];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(httpClient: HttpClient, private route: ActivatedRoute, private adminService: AdminActiveGameService) {
    this.apiLoaded.next(false);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.MAP_KEY}&callback=gmNoop`;
    script.onload = () => {
      this.apiLoaded.next(true);
    };
    document.head.appendChild(script);
    /*this.apiLoaded = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=API_KEY", "gmNoop")
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
          this.gameStatuses = res.teamGameStatuses;
          this.places = res.places;
          this.selectedTeamStatus = this.gameStatuses[0];
          console.log("loaded: ",this.selectedTeamStatus)
          this.selectedTeamPlace = this.gameStatuses[0]?.placeStatuses[0];
          console.log("gameData:", res);
          this.processDataToMarkers(res);
        }));
      }
    });
  }

  processDataToMarkers(gameData: GameWithStatuses) {
    const placeMap: Map<number, {
      name: string,
      lat: number,
      lng: number,
      teams: { teamName: string, reached: Date }[]
    }> = new Map();
    this.gameMarkers = [];
    let placeN = 18.5;
    const teams: { id: number; name: string; lat: number; lng: number; date: Date }[] = [];
    //const places = [];

    gameData.places.forEach(place => {
      placeMap.set(place.id, {name: place.name, lat: 47.49, lng: placeN += 0.2, teams: []});
    });

    gameData.teamGameStatuses.forEach(teamStatus => {
      teams.push({
        id: teamStatus.teamId,
        name: teamStatus.teamName,
        lat: teamStatus.lastLatitude,
        lng: teamStatus.lastLongitude,
        date: teamStatus.updatedAt
      });

      teamStatus.placeStatuses.forEach(ps => {
        if(ps.reached) {
          placeMap.get(ps.placeId)?.teams.push({teamName: teamStatus.teamName, reached: ps.reachedAt});
        }
        //teams.push({teamName: teamStatus.teamName, reached: ps.reachedAt})
      });
      //placeMap.set(ps.placeId, {teamName: teamStatus.teamName, reached: ps.reachedAt})
    });

    console.log("t", teams);
    console.log(placeMap);

    this.gameMarkers.length = 0;

    teams.forEach(team => {
      this.gameMarkers.push({
        infoTeam: {
          teamName: team.name,
          date: team.date
        },
        position: {
          lat: team.lat,
          lng: team.lng
        },
        option: {
          title: team.name,
          icon: "assets/svg/map-team.svg"
        }
      });
    });

    placeMap.forEach((place, id) => {
      this.gameMarkers.push({
        position: {
          lat: place.lat,
          lng: place.lng
        },
        infoPlace: {
          placeName: place.name,
          teams: place.teams,
          id: id
        },
        option: {
          title: place.name
        }
      });
    });

    console.log("markers: ", this.gameMarkers);


  }

  openInfoWindow(marker: MapMarker, tmarker: GameMarker) {
    this.selectedMarker = tmarker;
    this.infoWindow.open(marker);
  }

  selectTeamStatus(teamStatusId: string) {
    this.selectedTeamStatus = this.gameStatuses.find(s => s.id === Number(teamStatusId));
  }

  selectTeamPlace(placeId: string) {
    this.selectedTeamPlace = this.selectedTeamStatus?.placeStatuses?.find(p => p.placeId === Number(placeId));
    console.log(this.selectedTeamPlace);
  }

  getPlaceName(placeId: number): string {
    return this.places.find(p => p.id === placeId)?.name ?? "Ismeretlen";
  }

  protected readonly myTrackBy = myTrackBy;
}
