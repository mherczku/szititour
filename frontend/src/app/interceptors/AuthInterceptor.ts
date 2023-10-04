import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest, HttpHandler,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/AuthService";
import { LoaderService } from "../services/Loader.service";
import { CONST_MESSAGES, CONST_MESSAGE_KEY } from "../constants/messages-be.constants";
import { NotificationService } from "../services/Notification.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly loaderService: LoaderService,
    private readonly notiService: NotificationService) {
  }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //* Starting loader at every request:
    this.loaderService.start();

    return next.handle(this.addRokHeader(this.addAuthToken(httpRequest)))
      .pipe(tap(evt => {

        if (evt instanceof HttpResponse) {

          //* Stopping loader:
          this.loaderService.stop();

          //* Success message:
          const response = evt?.body as any;
          if (response.messageCode && CONST_MESSAGES[(response?.messageCode as CONST_MESSAGE_KEY)]) {
            this.notiService.success(CONST_MESSAGES[(response?.messageCode as CONST_MESSAGE_KEY)]);
          }

          if (evt.headers.has("Authorization")) {
            const token = evt.headers.get("Authorization")?.substring(7);
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
