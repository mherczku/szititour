import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ActiveGameService} from "../../../../services/ActiveGameService";
import {Observable, tap} from "rxjs";
import {ActiveGame} from "../../../../types/game";
import {PlaceCardComponent} from "../../../components/user/place-card/place-card.component";
import {ActivePlace} from "../../../../types/place";
import {QuestionCardComponent} from "../../../components/user/question-card/question-card.component";

@Component({
  selector: "app-active-game",
  standalone: true,
  imports: [CommonModule, PlaceCardComponent, QuestionCardComponent],
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
        this.activeGame$ = this.activeGameService.getActiveGameData(id).pipe(tap(data => {
          this.selectedPlace = data.places[0];
        }));
      }
    });
  }

  selectPlace(place: ActivePlace) {
    if(place.selectable) {
      this.selectedPlace = place;
    }
  }
}
