import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2, Signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "./notification/notification.component";
import { NotificationService, SzititourNotification } from "src/app/services/Notification.service";
import { popInOut } from "../../animations/pupInOut.animation";
import { PushNotificationService } from "src/app/services/PushNotification.service";
import { AuthService } from "src/app/services/AuthService";

@Component({
    selector: "app-notifications",
    standalone: true,
    templateUrl: "./notifications.component.html",
    styleUrls: ["./notifications.component.scss"],
    imports: [CommonModule, NotificationComponent],
    animations: [popInOut],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit, OnDestroy {

    $isNotiOpen = this.notiService.isOpenR;
    $isPushActive = computed(() => this.pushService.$state() === "true");
    $isLoggedIn = this.authService.$isLoggedIn;

    $notifications: Signal<SzititourNotification[]> = this.notiService.getNotifications();

    private unlistens?: () => void;

    constructor(
        private readonly notiService: NotificationService,
        private readonly authService: AuthService,
        private readonly pushService: PushNotificationService,
        private readonly renderer2: Renderer2
    ) { }


    ngOnInit() {
        this.renderer2.listen("document", "click", () => {
            this.close();
        });
    }

    clicInside($event: MouseEvent) {
        $event.stopPropagation();
    }
    close() {
        this.notiService.setOpen(false);
    }

    seenAll() {
        this.notiService.seenAllNotifications();
    }

    removeAll() {
        this.notiService.removeAllNotifications();
    }

    ngOnDestroy(): void {
        this.unlistens?.();
    }
}
