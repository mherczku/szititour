import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { ButtonType } from "src/app/enums/button-type";
import {TextInputType} from "../../../enums/text-input-type";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"]
})
export class TextInputComponent implements OnInit {

  @Input() placeholder = "Ide írhatsz";
  @Input() label = "Label:";
  @Input() classes = "";
  @Input() password = false;
  @Input() type: TextInputType = TextInputType.label;
  @Input() value = "";
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  inputType = "text";
  editing = false;

  TextInputType = TextInputType;
  ButtonType = ButtonType;

  ngOnInit(): void {
    if(this.password) {
      this.inputType = "password";
    }
  }

}
