import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Place} from "../../interfaces/place";
import {TextInputType} from "../../enums/text-input-type";

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  @Input() place!: Place
  @Output() placeChange: EventEmitter<Place> = new EventEmitter<Place>()
  TextInputType = TextInputType;

  constructor() { }

  ngOnInit(): void {
  }

}
