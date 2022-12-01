import {Component, Input, OnInit} from '@angular/core';
import { ButtonType } from 'src/app/enums/button-type';
import {Place} from "../../interfaces/place";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() place: Place = {id: -1, name: "TestPlace", img: "", gameId: -1, address: "", latitude: '', longitude: "", questions: []}

  open: boolean = false

  ButtonType = ButtonType;

  constructor() { }

  ngOnInit(): void {
  }

  toggle($event: MouseEvent) {
    this.open = !this.open
    $event.stopPropagation()
  }
}
