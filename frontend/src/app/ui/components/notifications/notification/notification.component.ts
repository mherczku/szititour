import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationService, SzititourNotification } from "src/app/services/Notification.service";
import { ButtonsComponent } from "../../buttons/buttons.component";

@Component({
  selector: "app-notification",
  standalone: true,
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
  imports: [CommonModule, ButtonsComponent]
})
export class NotificationComponent {


  @Input({required: true}) noti!: SzititourNotification;

  constructor(
    private readonly notiService: NotificationService
  ) {}

  removeNoti() {
    this.notiService.removeNoti(this.noti);
  }

}
