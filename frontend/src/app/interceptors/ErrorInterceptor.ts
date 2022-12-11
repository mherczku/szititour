import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {HotToastService} from "@ngneat/hot-toast";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: HotToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any, _caught: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err?.error?.errorMessage) {
            this.toastService.error(err.error.errorMessage)
          }
          else {
            switch (err.status) {
              case HttpStatusCode.GatewayTimeout: {
                this.toastService.error("Gateway Timed Out")
                break;
              }
              case HttpStatusCode.RequestTimeout: {
                this.toastService.error("Request Timed Out")
                break;
              }
              case HttpStatusCode.BadRequest: {
                this.toastService.error("Bad Request")
                break;
              }
              case HttpStatusCode.InternalServerError: {
                this.toastService.error("Internal Error")
                break;
              }
              case HttpStatusCode.NotFound: {
                this.toastService.error("Requested object not found")
                break;
              }
            }
          }
        }
        return throwError(() => err)
      }),
    )
  }
}
