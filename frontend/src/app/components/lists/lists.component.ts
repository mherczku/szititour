import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../interfaces/team";
import {ButtonType} from "../../enums/button-type";
import {Place} from 'src/app/interfaces/place';
import {ListType} from "../../enums/list-types";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  styles: [`
    :host {
      width: 100%;
    }
  `],
})
export class ListsComponent implements OnInit {

  @Input() type: ListType = ListType.teams
  @Input() teams: Team[] = [
    {id: 0, name: "Team0", email: "", admin: false},
    {id: 1, name: "Team1", email: "", admin: false},
    {id: 2, name: "Team2", email: "", admin: false},
    {id: 3, name: "Team3", email: "", admin: false},
    {id: 4, name: "Team4", email: "", admin: false},
    {id: 5, name: "Team5", email: "", admin: false},
  ]
  @Input() places: Place[] = [
    {
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
    },
    {
      id: 0,
      name: "Place2",
      img: "",
      gameId: -1,
      address: "Budapest Test Address street 1",
      latitude: '12,123',
      longitude: "123.12312",
      questions: [{name: "Mi ez?", placeId: 1, type: 1, isRiddle: false, id: 0}]
    },
    {
      id: 0,
      name: "Place3",
      img: "",
      gameId: -1,
      address: "Budapest Test Address street 1",
      latitude: '12,123',
      longitude: "123.12312",
      questions: [{name: "Mi ez?", placeId: 1, type: 1, isRiddle: false, id: 0}]
    }
  ]
  ButtonType = ButtonType;
  ListType = ListType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
