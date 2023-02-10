import {Component, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
import {Place} from "src/app/types/place";
import {ListType} from "../../enums/list-types";
import {Application} from "../../types/application";
import {AdminService} from "../../services/AdminService";
import {Subscription} from "rxjs";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"],
  styles: [`
    :host {
      width: 100%;
    }
  `],
})
export class ListsComponent implements OnDestroy {

  ListType = ListType;

  @Input() type: ListType = ListType.applications;
  @Input() applications: Application[] = [];
  @Input() places: Place[] = [];
  @Input() gameIdForPlacesList = 0;

  @Output() applicationsChange: EventEmitter<Application[]> = new EventEmitter<Application[]>();

  reviewing = false;

  subscriptionReview?: Subscription;

  constructor(private adminService: AdminService) {
  }
  reviewApplication(application: Application, isAccepted: boolean) {
    this.reviewing = true;
    this.subscriptionReview = this.adminService.reviewApplication(application, isAccepted).subscribe({
      next: value => {
        const foundIndex = this.applications.findIndex(x => x.id == value.id);
        this.applications[foundIndex] = value;
        this.reviewing = false;
      },
      error: _err => {
        this.reviewing = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionReview?.unsubscribe();
  }
}
