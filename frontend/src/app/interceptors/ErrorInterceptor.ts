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
import { NotificationService } from "../services/Notification.service";
import { CONST_MESSAGES, CONST_MESSAGE_KEY } from "../constants/messages-be.constants";
import { LoaderService } from "../services/Loader.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly notiService: NotificationService,
    private readonly loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          //* Stopping loader
          this.loaderService.stop();
          if (err?.error?.messageCode && CONST_MESSAGES[(err?.error?.messageCode as CONST_MESSAGE_KEY)]) {
            this.notiService.error(CONST_MESSAGES[(err?.error?.messageCode as CONST_MESSAGE_KEY)]);
          }
          else {
            switch (err.status) {
              case HttpStatusCode.GatewayTimeout: {
                this.notiService.error("Gateway Timed Out");
                break;
              }
              case HttpStatusCode.RequestTimeout: {
                this.notiService.error("Request Timed Out");
                break;
              }
              case HttpStatusCode.BadRequest: {
                this.notiService.error("Hibás kérés");
                break;
              }
              case HttpStatusCode.NotFound: {
                this.notiService.error("Keresett elem nem található");
                break;
              }
              default: {
                this.notiService.error(CONST_MESSAGES["UNKNOWN"]);
              }
            }
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
