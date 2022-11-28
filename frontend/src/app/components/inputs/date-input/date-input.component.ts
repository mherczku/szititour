import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit {

  @Input() name: string = "Label";
  @Input() date: Date = new Date()
  @Input() classes: string = "";
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>()

  constructor() { }

  ngOnInit(): void {
  }

  changed($event: Date) {
    this.date = $event
    this.dateChange.emit(this.date)
  }
}
