import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({providedIn: "root"})
export class UserService {

  private baseUrl = environment.apiBaseUrl + "/user";

  constructor(private http: HttpClient) { }

  public getGames(): Observable<unknown> {
    return this.http.get<unknown>(`${this.baseUrl}/games`);
  }

}
