import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonType} from "../../enums/button-type";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Input() text: string = "Click here"
  @Input() textHover: string = "Click here hovered"
  @Input() classes: string = ""
  @Input() type: ButtonType = ButtonType.simple
  @Input() iconSrc: string = ""
  @Input() isDisabledProgress: boolean = false
  @Input() isDisabledBlocked: boolean = false

  @Output() onClicked: EventEmitter<any> = new EventEmitter<any>()

  ButtonType = ButtonType
  mouseOver = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick($event: MouseEvent) {
    if(!this.isDisabledBlocked && !this.isDisabledProgress){
      this.onClicked.emit()
    }
  }

}
