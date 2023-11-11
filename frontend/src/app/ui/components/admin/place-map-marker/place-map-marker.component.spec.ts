import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlaceMapMarkerComponent } from "./place-map-marker.component";

describe("PlaceMapMarkerComponent", () => {
  let component: PlaceMapMarkerComponent;
  let fixture: ComponentFixture<PlaceMapMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceMapMarkerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlaceMapMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
