import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";
import { Game } from "../types/game";
import { Team, TeamUpdatePassword, TeamUpdateProfile } from "../types/team";
import { AuthService } from "./AuthService";
import { NetworkResponse } from "../types/network-response";


@Injectable({ providedIn: "root" })
export class UserService {

  private baseUrl = environment.apiBaseUrl + "/user";

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService) { }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  applyForGame(gameId: number): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/apply`, gameId);
  }

  cancelApplicationForGame(gameId: number): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/cancel`, gameId);
  }

  updateProfile(team: TeamUpdateProfile): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/update`, team).pipe(tap(t => {
      this.authService.dispatchLogin(t);
    }));
  }

  updatePasswordRequest(): Observable<NetworkResponse> {
    return this.http.get<NetworkResponse>(`${this.baseUrl}/update/password-request`);
  }

  updatePassword(token: string, newPassword: string): Observable<NetworkResponse> {
    const data = {
      newPassword: newPassword
    };
    const headers = new HttpHeaders()
      .set("passwordToken", token);

    return this.http.post<NetworkResponse>(`${this.baseUrl}/update/password`, data, { headers: headers });
  }

  updateEmail(newEmail: string): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/update/email`, newEmail).pipe(tap(t => {
      this.authService.dispatchLogin(t);
    }));
  }

  revokeToken(tokenId: string): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/revoke`, tokenId).pipe(tap(t => {
      this.authService.dispatchLogin(t);
    }));
  }

  updateImage(image: File): Observable<Team> {
    const formData: FormData = new FormData();
    formData.append("image", image);
    return this.http.post<Team>(`${this.baseUrl}/update/image`, formData).pipe(tap(t => {
      this.authService.dispatchLogin(t);
    }));
  }

  deleteAccountRequest(): Observable<NetworkResponse> {
    return this.http.delete<NetworkResponse>(this.baseUrl);
  }

  public deleteAccount(token: string): Observable<NetworkResponse> {
    const headers = new HttpHeaders()
      .set("deleteToken", token);
    return this.http.delete<NetworkResponse>(`${this.baseUrl}`, { headers: headers });
  }

}
