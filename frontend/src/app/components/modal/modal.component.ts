import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() displayedClassName = ""
  @Input() isDisplayed = false
  @Input() classes: string = ""
  @Output() isDisplayedChange = new EventEmitter<boolean>();

  @ViewChild('modalContent')
  modal!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  clickInside(event: FocusEvent) {
    if(!this.modal.nativeElement.contains(event.target)){
      this.isDisplayedChange.emit(false)
      this.isDisplayed = false
    }
  }

}
