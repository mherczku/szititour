import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {Team} from "../types/team";
import {login, logout} from "../store/actions/auth.actions";
import {Router} from "@angular/router";
import {NetworkLoginResponse} from "../types/network-login-response";
import {NetworkResponse} from "../types/network-response";
import {HotToastService} from "@ngneat/hot-toast";
import {selectLoggedInTeam} from "../store/selectors/auth.selector";


@Injectable({providedIn: "root"})
export class AuthService implements OnDestroy {

  private baseUrl = environment.apiBaseUrl + "/auth";
  private currentRole: "ROLE_GUEST" | "ROLE_ADMIN" | "ROLE_USER" = "ROLE_GUEST";
  private destroy$ = new Subject();

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private alertService: HotToastService) {

    this.store.select(selectLoggedInTeam).pipe(takeUntil(this.destroy$)).subscribe(team => {
      this.currentRole = team?.role ?? "ROLE_GUEST";
    });
  }

  isRoleAdmin(): boolean {
    return this.currentRole === "ROLE_ADMIN";
  }
  isRoleUser(): boolean {
    return this.currentRole === "ROLE_USER";
  }
  isRoleGuest(): boolean {
    return this.currentRole === "ROLE_GUEST";
  }

  public login(email: string, password: string): Observable<NetworkLoginResponse> {

    const usernamePassword = `${email}:${password}`;
    const encoded = btoa(usernamePassword);
    const authHeader = `Basic ${encoded}`;
    const headers = new HttpHeaders()
      .set("Authorization", authHeader)
      .set("email", email);

    return this.http.post<NetworkLoginResponse>(`${this.baseUrl}/login`, null, {headers: headers}).pipe(tap(evt => {
      if (evt.success) {
        const team: Team = evt.team;
        console.log(evt.team, team.role === "ROLE_ADMIN");
        if (team.role === "ROLE_ADMIN") {
          this.store.dispatch(login({team: team}));
          console.log("admin login", team);
          this.router.navigateByUrl("/admin");
        }
        // todo remove when user site is ready
        else {
          this.alertService.warning("Felhasználói oldal fejlesztés alatt... Kijelentkezés");
          this.logout();
        }
      }
    }));
  }

  public register(email: string, password: string): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/register`, {email: email, password: password});
  }

  public authorizeMe(): Observable<NetworkLoginResponse> {
    return this.http.get<NetworkLoginResponse>(`${this.baseUrl}`);
  }

  logout() {
    this.removeToken();
    this.store.dispatch(logout());
    this.router.navigateByUrl("/login");
  }

  setToken(token: string) {
    localStorage.setItem("auth-token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("auth-token");
  }

  removeToken() {
    localStorage.removeItem("auth-token");
  }

  dispatchLogin(team: Team) {
    this.store.dispatch(login({team: team}));
  }

  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }

  getRedirect(): string {
    switch (this.currentRole) {
      case "ROLE_ADMIN":
        return "admin";
      case "ROLE_GUEST":
        return "login";
      case "ROLE_USER":
        return "user/home";
    }
  }
}
