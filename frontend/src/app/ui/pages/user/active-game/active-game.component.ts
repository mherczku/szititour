import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ActiveGameService} from "../../../../services/ActiveGameService";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {ActiveGame} from "../../../../types/game";
import {PlaceCardComponent} from "../../../components/user/place-card/place-card.component";
import {ActivePlace} from "../../../../types/place";
import {QuestionCardComponent} from "../../../components/user/question-card/question-card.component";
import {Store} from "@ngrx/store";
import {selectGameStateStatuses} from "../../../../store/selectors/game-state.selector";
import {AnswerRequest, QuestionAnswer} from "../../../../types/requests/answer-request";
import {AutoDestroy} from "../../../../decorators/autodestroy.decorator";
import {loadGameState} from "../../../../store/actions/game-state.actions";
import {LocationService} from "../../../../services/LocationService";
import {myTrackBy} from "../../../../e-functions/extension-functions";

@Component({
  selector: "app-active-game",
  standalone: true,
  imports: [CommonModule, PlaceCardComponent, QuestionCardComponent],
  templateUrl: "./active-game.component.html",
  styleUrls: ["./active-game.component.scss"]
})
export class ActiveGameComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private activeGameService: ActiveGameService, private store: Store, private locationsService: LocationService) {
  }

  @AutoDestroy destroy$ = new Subject();

  activeGame$?: Observable<ActiveGame>;
  selectedPlace?: ActivePlace;
  teamStatus = this.store.select(selectGameStateStatuses);
  gameId = -1;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.gameId = id;
        this.locationsService.trackMe(this.gameId);
        //this.activeGameService.loadTeamGameStatus(id);
        this.activeGame$ = this.activeGameService.getActiveGameData(id).pipe(tap(data => {
          this.selectedPlace = data.places[0];
        }));
      }
    });
  }

  selectPlace(place: ActivePlace) {
    if (place.selectable) {
      this.selectedPlace = place;
    }
  }

  postAnswers() {
    const answers: QuestionAnswer[] = [];
    this.activeGameService.changedAnswers.forEach((value: AnswerRequest, key: number) => {
      if (value.imgFile) {
        this.activeGameService.answerQuestionWithImage(key, value.imgFile).pipe(takeUntil(this.destroy$)).subscribe((res) => {
          this.activeGameService.changedAnswers.delete(key);
          this.store.dispatch(loadGameState({gameState: res}));
        });
      } else {
        answers.push({questionId: key, answer: value});
      }
    });
    if(answers.length > 0){
      this.activeGameService.answerQuestions(this.gameId, answers).pipe(takeUntil(this.destroy$)).subscribe((res) => {
        answers.forEach((answer) => {
          this.activeGameService.changedAnswers.delete(answer.questionId);
        });
      });
    }
  }


    protected readonly myTrackBy = myTrackBy;
}
