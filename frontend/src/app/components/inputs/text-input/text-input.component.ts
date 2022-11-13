import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ButtonType } from 'src/app/enums/button-type';
import {TextInputType} from "../../../enums/text-input-type";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() placeholder: string = "Ide írhatsz"
  @Input() label: string = "Label:"
  @Input() classes: string = ""
  @Input() password: boolean = false
  @Input() type: TextInputType = TextInputType.label
  @Input() value: string = ""
  @Output() valueChange: EventEmitter<string> = new EventEmitter()

  inputType = "text"
  editing: boolean = false

  TextInputType = TextInputType
  ButtonType = ButtonType;

  constructor() { }

  ngOnInit(): void {
    if(this.password) {
      this.inputType = "password"
    }
  }

}
