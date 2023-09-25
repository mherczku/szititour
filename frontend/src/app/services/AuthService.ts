import { Injectable, OnDestroy, WritableSignal, computed, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, take, takeUntil, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Team } from "../types/team";
import { login, logout } from "../store/actions/auth.actions";
import { Router } from "@angular/router";
import { NetworkLoginResponse } from "../types/network-login-response";
import { NetworkResponse } from "../types/network-response";
import { HotToastService } from "@ngneat/hot-toast";
import { selectLoggedInTeam } from "../store/selectors/auth.selector";
import { CONST_ROUTES } from "../constants/routes.constants";


export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ClientData {
  platform: string;
  isMobile: string;
  brand: string;
  tokenId?: string;
  isGoogle?: boolean;
  ipAddress?: string;
}

@Injectable({ providedIn: "root" })
export class AuthService implements OnDestroy {

  private baseUrl = environment.apiBaseUrl + "/auth";
  private currentRole: "ROLE_GUEST" | "ROLE_ADMIN" | "ROLE_USER" = "ROLE_GUEST";
  private destroy$ = new Subject();
  private username = "GUEST";

  private $currentTeam: WritableSignal<Team | undefined> = signal(undefined);
  public $currentTeamR = computed(() => this.$currentTeam());
  public $isLoggedIn = computed(() => this.$currentTeam() !== undefined);
  public $isAdmin = computed(() => this.$currentTeam()?.role === "ROLE_ADMIN");

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router) {

    this.store.select(selectLoggedInTeam).pipe(takeUntil(this.destroy$)).subscribe(team => {
      this.$currentTeam.set(team ?? undefined);
      console.log(`set current user Signal ${team?.email}, , , ${this.$currentTeamR()?.email}`);

      this.currentRole = team?.role ?? "ROLE_GUEST";
      this.username = team?.name ?? "GUEST";
    });
  }

  isRoleAdmin(): boolean {
    const isAdmin = this.currentRole === "ROLE_ADMIN";
    if (!isAdmin) {
      if (this.isLoggedIn()) {
        this.router.navigateByUrl(CONST_ROUTES.user.call);
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
      this.router.navigateByUrl(CONST_ROUTES.auth.login.call);
    }
    return isLoggedIN;
  }
  isRoleGuest(): boolean {
    const isGuest = this.currentRole === "ROLE_GUEST";
    if (!isGuest) {
      if (this.isRoleAdmin()) {
        this.router.navigateByUrl(CONST_ROUTES.admin.call);
      } else {
        this.router.navigateByUrl(CONST_ROUTES.user.call);
      }
    }
    return isGuest;
  }

  public login(email: string, password: string): Observable<NetworkLoginResponse> {
    const usernamePassword = `${email}:${password}`;
    const encoded = btoa(usernamePassword);
    const authHeader = `Basic ${encoded}`;
    const headers = new HttpHeaders()
      .set("Authorization", authHeader);

    return this.http.post<NetworkLoginResponse>(`${this.baseUrl}/login`, this.getClientData(), { headers: headers }).pipe(tap(evt => {
      if (evt.success) {
        this.store.dispatch(login({ team: evt.team, notAuto: true }));
      }
    }));
  }

  public continueWithGoogle(token: string): Observable<NetworkLoginResponse> {
    const headers = new HttpHeaders()
      .set("googleToken", token);

    return this.http.post<NetworkLoginResponse>(`${this.baseUrl}/login/google`, this.getClientData(), { headers: headers }).pipe(tap(evt => {
      if (evt.success) {
        this.store.dispatch(login({ team: evt.team, notAuto: true }));
      }
    }));
  }

  public register(registerData: RegisterData): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/register`, registerData);
  }

  public authorizeMe(): Observable<NetworkLoginResponse> {
    return this.http.get<NetworkLoginResponse>(`${this.baseUrl}`);
  }


  verifyEmail(token: string): Observable<NetworkResponse> {
    return this.http.get<NetworkResponse>(`${this.baseUrl}/verifyEmail/${token}`);
  }

  logout() {
    if(this.getToken() !== null) {
      this.http.post<NetworkResponse>(`${this.baseUrl}/logout`, null).pipe(take(1)).subscribe();
    }
    this.removeToken();
    this.dispatchLogout();
    this.router.navigateByUrl(CONST_ROUTES.auth.call);
  }

  setToken(token: string, tokenId: string) {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("auth-token-id", tokenId);
  }

  getToken(): string | null {
    return localStorage.getItem("auth-token");
  }

  getTokenId(): string | null {
    return localStorage.getItem("auth-token-id");
  }

  removeToken() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-token-id");
  }

  dispatchLogin(team: Team) {
    this.store.dispatch(login({ team: team }));
  }

  dispatchLogout() {
    this.store.dispatch(logout());
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

  private getClientData(): ClientData {
    const data = (navigator as any).userAgentData;
    return {
      isMobile: data.mobile ?? false,
      brand: `${data.brands[0].brand} ${data.brands[0].version}`,
      platform: data.platform ?? ""
    };
  }
}

