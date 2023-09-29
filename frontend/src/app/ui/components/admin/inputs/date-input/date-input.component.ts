import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: "app-date-input",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.scss"],
  imports: [
    FormsModule,
    DatePipe
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent {

  @Input() name = "Label";
  @Input() date: Date = new Date();
  @Input() classes = "";
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  changed($event: Date) {
    this.date = $event;
    this.dateChange.emit(this.date);
  }
}
