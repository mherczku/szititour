import {Component, OnInit} from '@angular/core';
import {Place} from "../../../interfaces/place";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  place: Place = {
    id: 0,
    name: "Place1",
    img: "",
    gameId: -1,
    address: "Budapest Test Address street 1",
    latitude: '12,123',
    longitude: "123.12312",
    questions: [
      {name: "Mi ez?", placeId: 1, type: 1, isRiddle: false, id: 0},
      {name: "Mi ez?", placeId: 1, type: 1, isRiddle: false, id: 1}
    ]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
