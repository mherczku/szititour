import { ChangeDetectionStrategy, Component, OnInit, ViewChild, WritableSignal, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, tap } from "rxjs";
import { GameWithStatuses } from "../../../../types/game";
import { AdminActiveGameService } from "../../../../services/AdminActiveGameService";
import { ActivatedRoute } from "@angular/router";
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { FormsModule } from "@angular/forms";
import { PlaceStatusDto, TeamGameStatus } from "../../../../types/team-game-status";
import { AnswerComponent } from "../../../components/admin/answer/answer.component";
import { Place } from "../../../../types/place";
import { addMapApiHeader, myTrackBy } from "../../../../e-functions/extension-functions";


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
  styleUrls: ["./active-game.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveGameComponent implements OnInit {

  gameData?: Observable<GameWithStatuses>;
  $apiLoaded = signal(false);
  $isGameActive = signal(false);

  gameMarkers: GameMarker[] = [];

  circleOption: google.maps.CircleOptions = {
    draggable: false, radius: 50, strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#ffb70c",
    fillOpacity: 0.35,
  };
  circleCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  circleVisible = false;


  center: google.maps.LatLngLiteral = { lat: 47.497913, lng: 19.040236 };
  zoom = 11;

  selectedMarker?: GameMarker;
  $selectedTeamStatus: WritableSignal<TeamGameStatus | undefined> = signal(undefined);
  $selectedTeamPlace: WritableSignal<PlaceStatusDto | undefined> = signal(undefined);

  private gameStatuses: TeamGameStatus[] = [];
  private places: Place[] = [];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(GoogleMap) googleMap?: GoogleMap;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminService: AdminActiveGameService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      const gameId: number = p["id"];
      if (gameId) {
        this.gameData = this.adminService.getGameWithStatusesById(gameId).pipe(tap(res => {
          this.$isGameActive.set(res.active);
          if (res.active) {
            addMapApiHeader(() => {
              this.$apiLoaded.set(true);
            });
          }
          this.gameStatuses = res.teamGameStatuses;
          this.places = res.places;
          this.$selectedTeamStatus.set(this.gameStatuses[0]);
          this.$selectedTeamPlace.set(this.gameStatuses[0]?.placeStatuses[0]);
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
    const teams: { id: number; name: string; lat: number; lng: number; date: Date }[] = [];

    gameData.places.forEach(place => {
      placeMap.set(place.id, { name: place.name, lat: place.latitude, lng: place.longitude, teams: [] });
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
        if (ps.reached) {
          placeMap.get(ps.placeId)?.teams.push({ teamName: teamStatus.teamName, reached: ps.reachedAt });
        }
      });
    });

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
  }

  openInfoWindow(marker: MapMarker, tmarker: GameMarker) {
    this.circleOption.map = this.googleMap?.googleMap;
    this.circleVisible = true;
    this.circleCenter = tmarker.position;
    this.selectedMarker = tmarker;
    this.infoWindow.open(marker);
  }

  selectTeamStatus(teamStatusId: string) {
    this.$selectedTeamStatus.set(this.gameStatuses.find(s => s.id === Number(teamStatusId)));
    this.$selectedTeamPlace.set(this.$selectedTeamStatus()?.placeStatuses[0]);
  }

  selectTeamPlace(placeId: string) {
    this.$selectedTeamPlace.set(this.$selectedTeamStatus()?.placeStatuses?.find(p => p.placeId === Number(placeId)));
  }

  getPlaceName(placeId: number): string {
    return this.places.find(p => p.id === placeId)?.name ?? "Ismeretlen";
  }

  protected readonly myTrackBy = myTrackBy;

}
