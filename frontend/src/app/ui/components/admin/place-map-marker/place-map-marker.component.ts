import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GoogleMapsModule, MapMarker} from "@angular/google-maps";
import {Subject} from "rxjs";
import {addMapApiHeader} from "../../../../e-functions/extension-functions";


export type PlaceLocationData = {
  lat: number,
  lng: number,
  address: string
}

@Component({
  selector: "app-place-map-marker",
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: "./place-map-marker.component.html",
  styleUrls: ["./place-map-marker.component.scss"]
})
export class PlaceMapMarkerComponent implements OnInit{

  zoom = 11;
  @Input() markerPosition: google.maps.LatLngLiteral = {lat: 47.49, lng: 19.04};
  @Input() set title(value: string) {
    this.markerOption.title = value;
  }
  markerOption: google.maps.MarkerOptions = {draggable: true, optimized: true, clickable: true};
  apiLoaded = false;
  geocoder?: google.maps.Geocoder;

  newPosition?: google.maps.LatLngLiteral;

  @Output() locationDataChanged = new EventEmitter<PlaceLocationData>();


 ngOnInit() {
    this.apiLoaded = false;
   addMapApiHeader(() => {
     this.apiLoaded = true;
     this.geocoder = new google.maps.Geocoder();
   });
 }

  markerPositionChanged(marker: MapMarker) {
    console.log("marker position changed up")
    const lat = marker.getPosition()?.lat();
    const lng = marker.getPosition()?.lng();
    if (lat && lng) {
      this.newPosition = {lat: lat, lng: lng};
      this.geocoder?.geocode({location: this.newPosition}).then(res => {
        if (res.results[0] && this.newPosition) {
          this.locationDataChanged.emit({
            address: res.results[0].formatted_address,
            lat: this.newPosition.lat,
            lng: this.newPosition.lng
          });
        }
      });
    }
  }
}
