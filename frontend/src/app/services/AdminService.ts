import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../interfaces/game";
import {Application} from "../interfaces/application";
import {ApplicationOriginal} from "../interfaces/application-original";
import {Place} from "../interfaces/place";
import {Question} from "../interfaces/question";


@Injectable({providedIn: 'root'})
export class AdminService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllGames(): Observable<unknown> {
    return this.http.get<unknown>(`${this.baseUrl}/games`)
  }

  createGame2(newGame: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games`, newGame)
  }

  createGame(newGame: Game, image: File | undefined): Observable<Game> {
    const formData: FormData = new FormData()
    formData.append('gameStart', newGame.dateStart.valueOf().toString())
    formData.append('gameEnd', newGame.dateEnd.valueOf().toString())
    formData.append('gameTitle', newGame.title)
    if(image) {
      formData.append('image', image)
    }
    return this.http.post<Game>(`${this.baseUrl}/games/image`, formData)
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

  addPlaceToGame(place: Place): Observable<Place> {
    return this.http.post<Place>(`${this.baseUrl}/places/`, place)
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.baseUrl}/places/`, place)
  }

  deletePlace(id: number) {
    return this.http.delete<unknown>(`${this.baseUrl}/places/${id}`)
  }

  createQuestion(question: Question): Observable<Question>  {
    return this.http.post<Question>(`${this.baseUrl}/questions/`, question)
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/questions/`, question)
  }

  deleteQuestion(id: number) {
    return this.http.delete<unknown>(`${this.baseUrl}/questions/${id}`)
  }

}
