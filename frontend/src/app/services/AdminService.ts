import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../types/game";
import {Application} from "../types/application";
import {ApplicationOriginal} from "../types/application-original";
import {Place} from "../types/place";
import {Question} from "../types/question";


@Injectable({providedIn: "root"})
export class AdminService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllGames(): Observable<unknown> {
    return this.http.get<unknown>(`${this.baseUrl}/games`);
  }

  createGame(newGame: Game, image: File | undefined = undefined): Observable<Game> {
    const dateStartNumber: number =  isNaN(Date.parse(newGame.dateStart.valueOf().toString())) ? newGame.dateStart.valueOf() : Date.parse(newGame.dateStart.valueOf().toString());
    const dateEndNumber: number = isNaN(Date.parse(newGame.dateEnd.valueOf().toString())) ? newGame.dateEnd.valueOf() : Date.parse(newGame.dateEnd.valueOf().toString());
    const formData: FormData = new FormData();
    formData.append("gameStart", dateStartNumber.toString());
    formData.append("gameEnd", dateEndNumber.toString());
    formData.append("gameTitle", newGame.title);
    if(image) {
      formData.append("image", image);
    }
    return this.http.post<Game>(`${this.baseUrl}/games/image`, formData);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${id}`);
  }

  updateGame(game: Game, image: File | undefined = undefined): Observable<Game> {
    const dateStartNumber: number =  isNaN(Date.parse(game.dateStart.valueOf().toString())) ? game.dateStart.valueOf() : Date.parse(game.dateStart.valueOf().toString());
    const dateEndNumber: number = isNaN(Date.parse(game.dateEnd.valueOf().toString())) ? game.dateEnd.valueOf() : Date.parse(game.dateEnd.valueOf().toString());
    const formData: FormData = new FormData();
    formData.append("gameStart", dateStartNumber.toString());
    formData.append("gameEnd", dateEndNumber.toString());
    formData.append("gameTitle", game.title);
    formData.append("gameId", game.id.toString());
    formData.append("currentImage", game.img ?? "");
    if(image) {
      formData.append("image", image);
    }
    return this.http.put<Game>(`${this.baseUrl}/games`, formData);
  }

  deleteGame(id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${this.baseUrl}/games/${id}`);
  }

  reviewApplication(application: Application, isAccepted: boolean): Observable<Application> {
    const updated: ApplicationOriginal = {
      id: application.id,
      accepted: isAccepted,
      game: {id: application.gameId},
      team: {id: application.teamId}
    };
    return this.http.put<Application>(`${this.baseUrl}/applications/`, updated);
  }

  getPlaceById(placeId: number): Observable<Place> {
    return this.http.get<Place>(`${this.baseUrl}/places/${placeId}`);
  }

  addPlaceToGame(place: Place, image: File | undefined = undefined): Observable<Place> {
    const formData: FormData = new FormData();
    formData.append("name", place.name);
    formData.append("address", place.address);
    formData.append("gameId", place.gameId.toString());
    formData.append("lat", place.latitude.toString());
    formData.append("lng", place.longitude.toString());
    if(image) {
      formData.append("image", image);
    }
    return this.http.post<Place>(`${this.baseUrl}/places/`, formData);
  }

  updatePlace(place: Place, image: File | undefined = undefined): Observable<Place> {
    const formData: FormData = new FormData();
    formData.append("name", place.name);
    formData.append("address", place.address);
    formData.append("placeId", place.id.toString());
    formData.append("lat", place.latitude.toString());
    formData.append("lng", place.longitude.toString());
    if(image) {
      formData.append("image", image);
    }
    return this.http.put<Place>(`${this.baseUrl}/places/`, formData);
  }

  deletePlace(id: number) {
    return this.http.delete<unknown>(`${this.baseUrl}/places/${id}`);
  }

  createQuestion(question: Question, image: File | undefined = undefined): Observable<Question>  {
    const formData: FormData = new FormData();
    formData.append("name", question.name);
    formData.append("type", question.type.toString());
    formData.append("riddle", question.riddle ? "true" : "false");
    formData.append("placeId", question.placeId.toString());
    if(image) {
      formData.append("image", image);
    }
    return this.http.post<Question>(`${this.baseUrl}/questions/`, formData);
  }

  updateQuestion(question: Question, image: File | undefined = undefined): Observable<Question> {
    const formData: FormData = new FormData();
    formData.append("name", question.name);
    formData.append("currentImage", question.img ?? "");
    formData.append("type", question.type.toString());
    formData.append("riddle", question.riddle ? "true" : "false");
    formData.append("questionId", question.id.toString());
    if(image) {
      formData.append("image", image);
    }
    return this.http.put<Question>(`${this.baseUrl}/questions/`, formData);
  }

  deleteQuestion(id: number) {
    return this.http.delete<unknown>(`${this.baseUrl}/questions/${id}`);
  }

  changeGameActivation(gameId: number, activate: boolean): Observable<Game> {
    if(activate) {
      return this.http.put<Game>(`${this.baseUrl}/games/activate/${gameId}`, null);
    } else {
      return this.http.put<Game>(`${this.baseUrl}/games/deactivate/${gameId}`, null);
    }
  }


}
