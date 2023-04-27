import {Injectable} from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationService} from "../services/LocationService";

@Injectable()
export class LocationInterceptor implements HttpInterceptor {

  constructor(private locationService: LocationService) {
  }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addLocation(httpRequest));
  }

  addLocation(request: HttpRequest<unknown>) {
    const lastLocation = this.locationService.getLocationData();
    if (lastLocation.isFresh && lastLocation.lastLatitude && lastLocation.lastLongitude && lastLocation.gameId) {
      this.locationService.setNotFresh();
      return request.clone({
        setHeaders: {
          longitude: lastLocation.lastLongitude.toString(),
          latitude: lastLocation.lastLatitude.toString(),
          gameid: lastLocation.gameId.toString()
        }
      });
    } else {
      return request;
    }
  }
}
