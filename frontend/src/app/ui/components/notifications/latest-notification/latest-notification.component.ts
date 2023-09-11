import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "../notification/notification.component";
import { NotificationService, SzititourNotification } from "src/app/services/Notification.service";
import { popInOut } from "src/app/ui/animations/pupInOut.animation";

@Component({
    selector: "app-latest-notification",
    standalone: true,
    templateUrl: "./latest-notification.component.html",
    styleUrls: ["./latest-notification.component.scss"],
    imports: [CommonModule, NotificationComponent],
    animations: [popInOut]
})
export class LatestNotificationComponent {

    latestNoti = this.notiService.latestNoti;
    defaultNoti: SzititourNotification = { id: "-1", title: "", message: "", time: new Date(), icon: "", link: "", type: "APP" };

    constructor(
        private readonly notiService: NotificationService
    ) { }

}
