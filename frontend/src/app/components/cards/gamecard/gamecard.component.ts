import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ButtonType } from 'src/app/enums/button-type';
import {Game} from "../../../interfaces/game";


@Component({
  selector: 'app-gamecard',
  templateUrl: './gamecard.component.html',
  styleUrls: ['./gamecard.component.css']
})
export class GamecardComponent implements OnInit {

  @Input() game: Game = {applications: ["t1", "t2"], dateEnd: "2020.10.10", dateStart: "2020.10.10", id: 0, img: "assets/img/sample.jpg", places: [], title: "SampleTitle"}
  @Output() onEditClicked: EventEmitter<unknown> = new EventEmitter<unknown>()
  @Output() onTeamsClicked: EventEmitter<unknown> = new EventEmitter<unknown>()
  @Output() onPlacesClicked: EventEmitter<unknown> = new EventEmitter<unknown>()

  ButtonType = ButtonType;

  constructor() {}

  ngOnInit(): void {
  }

  getAcceptedApplicationsLength() {
    //todo filter data check string? or application
    //this.game.applications.filter(e => e.)
  }

}
