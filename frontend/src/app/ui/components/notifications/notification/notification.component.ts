import { ChangeDetectionStrategy, Component, Input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationService, SzititourNotification } from "src/app/services/Notification.service";
import { ButtonsComponent } from "../../buttons/buttons.component";

@Component({
  selector: "app-notification",
  standalone: true,
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
  imports: [CommonModule, ButtonsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  /* @Input({ required: true }) */ $noti = signal<SzititourNotification>({
    id: "-1",
    title: "",
    message: "",
    time: new Date(),
    icon: "",
    link: "",
    type: "APP"
  });

  @Input({ required: true }) set setNoti(value: SzititourNotification) {
    this.$noti.set(value);
  }

  @Input({ required: true }) set setNotiSeen(value: boolean) {
    this.$noti.update(n => {
      n.isSeen = value;
      return n;
    });
  }

  constructor(
    private readonly notiService: NotificationService
  ) { }

  removeNoti() {
    this.notiService.removeNoti(this.$noti());
  }

  seenNoti() {
    this.notiService.seenNoti(this.$noti());
  }

}
