import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/AuthService";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addRokHeader(this.addAuthToken(httpRequest)))
      .pipe(tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.headers.has("Authorization")) {
            const token = evt.headers.get("Authorization")?.substring(7);
            console.log("header:", evt.headers, evt.headers.get("Tokenid"));
            if (token) {
              this.authService.setToken(token, evt.headers.get("Tokenid") ?? "");
            }
          }
        }
      }
      ));
  }

  addAuthToken(request: HttpRequest<unknown>) {
    const token = this.authService.getToken();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "yes"
        }
      });
    } else {
      return request;
    }
  }

  addRokHeader(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        "ngrok-skip-browser-warning": "yes"
      }
    });
  }
}
