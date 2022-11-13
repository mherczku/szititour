import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NetworkResponse} from "../interfaces/network-response";


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environment.apiBaseUrl + "/auth";

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/login`, {email: email, password: password})
  }

  public register(email: string, password: string) /*Observable<unknown>*/ {
    /*return this.http.post<unknown>(`${this.baseUrl}/register`, {email: email, password: password})*/
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
