import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoogleMap, GoogleMapsModule, MapMarker } from "@angular/google-maps";
import { addMapApiHeader } from "../../../../e-functions/extension-functions";


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
  styleUrls: ["./place-map-marker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceMapMarkerComponent implements OnInit {

  zoom = 11;
  @Input() markerPosition: google.maps.LatLngLiteral = { lat: 47.49, lng: 19.04 };
  @Input() set title(value: string) {
    this.markerOption.title = value;
  }
  markerOption: google.maps.MarkerOptions = { draggable: true, optimized: true, clickable: true };
  apiLoaded = false;
  geocoder?: google.maps.Geocoder;

  newPosition?: google.maps.LatLngLiteral;

  mapCircle?: google.maps.Circle;

  @ViewChild(GoogleMap) googleMap?: GoogleMap;

  @Output() locationDataChanged = new EventEmitter<PlaceLocationData>();

  constructor(private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.apiLoaded = false;
    addMapApiHeader(() => {
      this.apiLoaded = true;
      this.geocoder = new google.maps.Geocoder();
      this.change.markForCheck();
    });
  }


  markerPositionChanged(marker: MapMarker) {
    const lat = marker.getPosition()?.lat();
    const lng = marker.getPosition()?.lng();
    if (lat && lng) {
      this.newPosition = { lat: lat, lng: lng };
      this.geocoder?.geocode({ location: this.newPosition }).then(res => {
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

  mapInit() {
    if (!this.mapCircle) {
      this.mapCircle = new google.maps.Circle({
        draggable: false, radius: 50, strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ffb70c",
        fillOpacity: 0.35,
        map: this.googleMap?.googleMap,
        center: this.markerPosition
      });
    }
  }

  onMarkerDrag($event: google.maps.MapMouseEvent) {
    this.mapCircle?.setCenter($event.latLng);
  }
}
