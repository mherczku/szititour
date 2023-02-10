import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

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
  @Input() type: "label" | "editable" = "editable";
  @Input() value = "";
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  inputType = "text";
  editing = false;
  ngOnInit(): void {
    if(this.password) {
      this.inputType = "password";
    }
  }

}
