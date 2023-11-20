import {Injectable} from "@angular/core";


export type LastLocationData = {
  lastLatitude?: number;
  lastLongitude?: number;
  lastAltitude?: number | null;
  lastSpeed?: number | null;
  lastAccuracy?: number;
  isFresh?: boolean;
  gameId?: number;
}

@Injectable({providedIn: "root"})
export class LocationService {

  private isTracking = false;
  private lastLocation: LastLocationData = {};

  getLocationData() {
    return this.lastLocation;
  }

  setNotFresh() {
    this.lastLocation.isFresh = false;
  }

  trackMe(gameId: number) {
    if (navigator.geolocation) {
      this.isTracking = true;
      this.lastLocation.gameId = gameId;
      navigator.geolocation.watchPosition((position) => {
        this.lastLocation.lastLatitude = position.coords.latitude;
        this.lastLocation.lastLongitude = position.coords.longitude;
        this.lastLocation.lastAltitude = position.coords.altitude;
        this.lastLocation.lastSpeed = position.coords.speed;
        this.lastLocation.lastAccuracy = position.coords.accuracy;
        this.lastLocation.isFresh = true;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

}
