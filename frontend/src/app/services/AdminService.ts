import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Game} from "../interfaces/game";
import {Application} from "../interfaces/application";
import {ApplicationOriginal} from "../interfaces/application-original";
import {Place} from "../interfaces/place";


@Injectable({providedIn: 'root'})
export class AdminService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllGames(): Observable<unknown> {
    return this.http.get<unknown>(`${this.baseUrl}/games`)
  }

  createGame(newGame: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games`, newGame)
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/games`, game)
  }

  deleteGame(id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${this.baseUrl}/games/${id}`)
  }

  reviewApplication(application: Application, isAccepted: boolean): Observable<Application> {
    const updated: ApplicationOriginal = {
      id: application.id,
      accepted: isAccepted,
      game: {id: application.gameId},
      team: {id: application.teamId}
    }
    return this.http.put<Application>(`${this.baseUrl}/applications/`, updated)
  }

  getPlaceById(placeId: number): Observable<Place> {
    return this.http.get<Place>(`${this.baseUrl}/places/${placeId}`)
  }
}
