import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import {AuthService} from "../services/AuthService";
import { NotificationService } from "../services/Notification.service";
import { CONST_MESSAGES, CONST_MESSAGES_FE, CONST_MESSAGE_KEY } from "../constants/messages-be.constants";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private readonly notiService: NotificationService, private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === HttpStatusCode.Unauthorized) {
            if(this.authService.getToken() !== null) {
              this.notiService.error(CONST_MESSAGES[(err?.error?.messageCode as CONST_MESSAGE_KEY)] ?? CONST_MESSAGES_FE.UNKNOWN_AUTH);
            }
            this.authService.logout();
          }
        }
        return throwError(() => err);
      })
    );
  }
}
