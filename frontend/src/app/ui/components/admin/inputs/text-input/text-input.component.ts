import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonsComponent} from "../../../buttons/buttons.component";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
  imports: [
    NgSwitch,
    NgSwitchCase,
    FormsModule,
    ButtonsComponent,
    NgIf
  ],
  standalone: true
})
export class TextInputComponent implements OnInit {

  @Input() placeholder = "Ide írhatsz";
  @Input() label = "Label:";
  @Input() classes = "";
  @Input() password = false;
  @Input() type: "label" | "editable" = "label";
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
