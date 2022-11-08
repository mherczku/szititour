import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  @Input() value: string = ""
  @Output() valueChange: EventEmitter<string> = new EventEmitter()

  type = "text"

  constructor() { }

  ngOnInit(): void {
    if(this.password) {
      this.type = "password"
    }
  }

}
