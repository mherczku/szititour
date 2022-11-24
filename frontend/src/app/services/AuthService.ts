import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthState} from "../interfaces/states/auth-state";
import {Store} from "@ngrx/store";
import {Team} from "../interfaces/team";
import { login } from "../actions/auth.actions";
import {Router} from "@angular/router";
import {NetworkLoginResponse} from "../interfaces/network-login-response";


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + "/auth";

  constructor(private http: HttpClient, private store: Store<AuthState>, private router: Router) { }

  public login(email: string, password: string): Observable<NetworkLoginResponse> {
    return this.http.post<NetworkLoginResponse>(`${this.baseUrl}/login`, {email: email, password: password}).pipe(tap(evt => {
      if (evt.success) {
        const team: Team = evt.teamDto
        this.store.dispatch(login({team: team}))
        this.router.navigateByUrl("/admin")
      }
    }))
  }

  public register(email: string, password: string) /*Observable<unknown>*/ {
    /*return this.http.post<unknown>(`${this.baseUrl}/register`, {email: email, password: password})*/
  }

  public authorizeMe(): Observable<NetworkLoginResponse> {
    return this.http.get<NetworkLoginResponse>(`${this.baseUrl}`).pipe(tap(evt => {
      if (evt.success) {
        const team: Team = evt.teamDto
        this.store.dispatch(login({team: team}))
        this.router.navigateByUrl("/admin")
      }
    }))
  }

  setToken(token: string) {
    localStorage.setItem('auth-token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  removeToken() {
    localStorage.removeItem('auth-token')
  }

}
