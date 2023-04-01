import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ActiveGameService} from "../../../services/ActiveGameService";
import {Observable} from "rxjs";
import {ActiveGame} from "../../../types/game";
import {PlaceCardComponent} from "../../../components/user/place-card/place-card.component";
import {ActivePlace} from "../../../types/place";

@Component({
  selector: "app-active-game",
  standalone: true,
  imports: [CommonModule, PlaceCardComponent],
  templateUrl: "./active-game.component.html",
  styleUrls: ["./active-game.component.scss"]
})
export class ActiveGameComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private activeGameService: ActiveGameService) {
  }

  activeGame$?: Observable<ActiveGame>;
  selectedPlace?: ActivePlace;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.activeGame$ = this.activeGameService.getActiveGameData(id);
      }
    });
  }

  selectPlace(place: ActivePlace) {
    if(place.selectable) {
      this.selectedPlace = place;
    }
  }
}
