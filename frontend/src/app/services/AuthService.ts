import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthState} from "../interfaces/states/auth-state";
import {Store} from "@ngrx/store";
import {Team} from "../interfaces/team";
import {login, logout} from "../actions/auth.actions";
import {Router} from "@angular/router";
import {NetworkLoginResponse} from "../interfaces/network-login-response";
import {NetworkResponse} from "../interfaces/network-response";
import {HotToastService} from "@ngneat/hot-toast";


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + "/auth2";

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private alertService: HotToastService) {
  }

  public login(email: string, password: string): Observable<NetworkLoginResponse> {
    return this.http.post<NetworkLoginResponse>(`${this.baseUrl}/login`, {
      email: email,
      password: password
    }).pipe(tap(evt => {
      if (evt.success) {
        const team: Team = evt.team
        if (team.admin) {
          this.store.dispatch(login({team: team}))
          this.router.navigateByUrl("/admin")
        }
        // todo remove when user site is ready
        else {
          this.alertService.warning("User site is under development... Logging out")
          this.logout()
        }
      }
    }))
  }

  public register(email: string, password: string): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/register`, {email: email, password: password})
  }

  public authorizeMe(): Observable<NetworkLoginResponse> {
    return this.http.get<NetworkLoginResponse>(`${this.baseUrl}`)
  }

  logout() {
    this.removeToken()
    this.store.dispatch(logout())
    this.router.navigateByUrl('/login')
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

  dispatchLogin(team: Team) {
    this.store.dispatch(login({team: team}))
  }
}
