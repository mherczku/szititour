import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActiveGame } from "../types/game";
import { Observable, take, tap } from "rxjs";
import { TeamGameStatus } from "../types/team-game-status";
import { Store } from "@ngrx/store";
import { loadGameState } from "../store/actions/game-state.actions";
import { AnswerRequest, AnswersRequestBody, QuestionAnswer } from "../types/requests/answer-request";


@Injectable({ providedIn: "root" })
export class ActiveGameService {

  private baseUrl = environment.apiBaseUrl + "/user";

  constructor(private http: HttpClient, private store: Store) {
  }

  changedAnswers = new Map<number, AnswerRequest>;

  addAnswer(id: number, answer: AnswerRequest) {
    this.changedAnswers.set(id, answer);
  }

  getActiveGameData(gameId: number): Observable<ActiveGame> {
    return this.http.get<ActiveGame>(`${this.baseUrl}/activegame/${gameId}`).pipe(tap(game => {
      this.store.dispatch(loadGameState({ gameState: game.teamGameStatusDto }));
    }));
  }

  getTeamGameStatus(gameId: number): Observable<TeamGameStatus> {
    return this.http.get<TeamGameStatus>(`${this.baseUrl}/status/${gameId}`).pipe(tap(status => {
      this.store.dispatch(loadGameState({ gameState: status }));
    }));
  }

  loadTeamGameStatus(gameId: number) {
    return this.http.get<TeamGameStatus>(`${this.baseUrl}/status/${gameId}`).pipe(tap(status => {
      this.store.dispatch(loadGameState({ gameState: status }));
    })).pipe(take(1)).subscribe();
  }

  answerQuestions(gameId: number, questionAnswers: QuestionAnswer[]): Observable<TeamGameStatus> {
    const answersRequest: AnswersRequestBody = {
      gameId: gameId,
      questionAnswers: questionAnswers
    };
    return this.http.post<TeamGameStatus>(`${this.baseUrl}/answers`, answersRequest).pipe(tap(status => {
      this.store.dispatch(loadGameState({ gameState: status }));
    }));
  }

  answerQuestionWithImage(questionId: number, image: File) {
    const formData: FormData = new FormData();
    formData.append("image", image);
    return this.http.post<TeamGameStatus>(`${this.baseUrl}/answer/${questionId}/image`, formData);
  }

}
