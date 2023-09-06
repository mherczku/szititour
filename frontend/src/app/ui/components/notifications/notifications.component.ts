import { Component, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "./notification/notification.component";
import { NotificationService, SzititourNotification } from "src/app/services/Notification.service";

@Component({
    selector: "app-notifications",
    standalone: true,
    templateUrl: "./notifications.component.html",
    styleUrls: ["./notifications.component.scss"],
    imports: [CommonModule, NotificationComponent]
})
export class NotificationsComponent {

    notifications: Signal<SzititourNotification[]> = this.notiService.getNotifications();

    constructor(
        private readonly notiService: NotificationService
    ) { }


}
