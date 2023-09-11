import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Game} from "../types/game";
import {Team, UpdateTeam} from "../types/team";


@Injectable({providedIn: "root"})
export class UserService {

  private baseUrl = environment.apiBaseUrl + "/user";

  constructor(private http: HttpClient) {
    /*setInterval(() => {
      this.obs.next(this.i++);
    }, 500);*/
  }

  obs = new Subject<number>();
  i = 1;

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  applyForGame(gameId: number): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/apply`, gameId);
  }

  cancelApplicationForGame(gameId: number): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/cancel`, gameId);
  }

  getCucc(): Observable<number> {
    return this.obs.asObservable();
  }

  saveProfile(team: UpdateTeam): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/update`, team);
  }

}
