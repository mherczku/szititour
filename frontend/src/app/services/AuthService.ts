import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, takeUntil, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Team } from "../types/team";
import { login, logout } from "../store/actions/auth.actions";
import { Router } from "@angular/router";
import { NetworkLoginResponse } from "../types/network-login-response";
import { NetworkResponse } from "../types/network-response";
import { HotToastService } from "@ngneat/hot-toast";
import { selectLoggedInTeam } from "../store/selectors/auth.selector";


export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

@Injectable({ providedIn: "root" })
export class AuthService implements OnDestroy {

  private baseUrl = environment.apiBaseUrl + "/auth";
  private currentRole: "ROLE_GUEST" | "ROLE_ADMIN" | "ROLE_USER" = "ROLE_GUEST";
  private destroy$ = new Subject();
  private username = "GUEST";

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private alertService: HotToastService) {

    this.store.select(selectLoggedInTeam).pipe(takeUntil(this.destroy$)).subscribe(team => {
      this.currentRole = team?.role ?? "ROLE_GUEST";
      this.username = team?.name ?? "GUEST";
    });
  }

  isRoleAdmin(): boolean {
    const isAdmin = this.currentRole === "ROLE_ADMIN";
    if (!isAdmin) {
      if (this.isLoggedIn()) {
        this.router.navigateByUrl("user");
      }
    }
    return isAdmin;
  }
  isRoleUser(): boolean {
    return this.currentRole === "ROLE_USER";
  }
  isLoggedIn(): boolean {
    const isLoggedIN = this.currentRole !== "ROLE_GUEST";
    if (!isLoggedIN) {
      this.router.navigateByUrl("login");
    }
    return isLoggedIN;
  }
  isRoleGuest(): boolean {
    const isGuest = this.currentRole === "ROLE_GUEST";
    if (!isGuest) {
      if (this.isRoleAdmin()) {
        this.router.navigateByUrl("admin");
      } else {
        this.router.navigateByUrl("user");
      }
    }
    return isGuest;
  }

  public login(email: string, password: string): Observable<NetworkLoginResponse> {

    const usernamePassword = `${email}:${password}`;
    const encoded = btoa(usernamePassword);
    const authHeader = `Basic ${encoded}`;
    const headers = new HttpHeaders()
      .set("Authorization", authHeader)
      .set("email", email);

    return this.http.post<NetworkLoginResponse>(`${this.baseUrl}/login`, null, { headers: headers }).pipe(tap(evt => {
      if (evt.success) {
        const team: Team = evt.team;
        console.log(evt.team, team.role === "ROLE_ADMIN");
        if (team.role === "ROLE_ADMIN") {
          this.store.dispatch(login({ team: team }));
          console.log("admin login", team);
          this.router.navigateByUrl("/admin");
        }
        else {
          this.router.navigateByUrl("/user");
        }
      }
    }));
  }

  public continueWithGoogle(token: string): Observable<NetworkLoginResponse> {
    const headers = new HttpHeaders()
      .set("googleToken", token);

    return this.http.get<NetworkLoginResponse>(`${this.baseUrl}/login/google`, { headers: headers }).pipe(tap(evt => {
      if (evt.success) {
        const team: Team = evt.team;
        console.log(evt.team, team.role === "ROLE_ADMIN");
        this.store.dispatch(login({ team: team }));
        if (team.role === "ROLE_ADMIN") {
          console.log("admin login", team);
          this.router.navigateByUrl("/admin");
        }
        else {
          this.router.navigateByUrl("/user");
        }
      }
    }));
  }

  public register(registerData: RegisterData): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/register`, registerData);
  }

  public authorizeMe(): Observable<NetworkLoginResponse> {
    return this.http.get<NetworkLoginResponse>(`${this.baseUrl}`).pipe(tap(res => {
      if (res.success) {
        //res.team.role === "ROLE_ADMIN" ? this.router.navigateByUrl("/admin") : this.router.navigateByUrl("/user");
      }
    }));
  }


  verifyEmail(token: string): Observable<NetworkResponse> {
    return this.http.get<NetworkResponse>(`${this.baseUrl}/verifyEmail/${token}`);
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
    this.store.dispatch(login({ team: team }));
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

  getUsername(): string {
    return this.username;
  }
}
