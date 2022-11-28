import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonType} from "../../enums/button-type";
import {Place} from 'src/app/interfaces/place';
import {ListType} from "../../enums/list-types";
import {Application} from "../../interfaces/application";
import {AdminService} from "../../services/AdminService";
import {HotToastService} from "@ngneat/hot-toast";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  styles: [`
    :host {
      width: 100%;
    }
  `],
})
export class ListsComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;
  ListType = ListType;

  @Input() type: ListType = ListType.applications
  @Input() applications: Application[] = []
  @Input() places: Place[] = []

  @Output() applicationsChange: EventEmitter<Application[]> = new EventEmitter<Application[]>()

  reviewing: boolean = false

  subscriptionReview?: Subscription

  constructor(private adminService: AdminService, private alert: HotToastService) {
  }

  ngOnInit(): void {
  }

  reviewApplication(application: Application, isAccepted: boolean) {
    this.reviewing = true
    this.subscriptionReview = this.adminService.reviewApplication(application, isAccepted).subscribe({
      next: value => {
        const foundIndex = this.applications.findIndex(x => x.id == value.id);
        this.applications[foundIndex] = value;
        this.reviewing = false
      },
      error: err => {
        this.reviewing = false
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionReview?.unsubscribe()
  }
}
