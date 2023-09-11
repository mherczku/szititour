import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "../../../services/AuthService";
import { selectIsLoggedIn, selectLoggedInTeam } from "../../../store/selectors/auth.selector";
import { FormsModule } from "@angular/forms";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { NotificationsComponent } from "../notifications/notifications.component";
import { NotificationService } from "src/app/services/Notification.service";
import { LatestNotificationComponent } from "../notifications/latest-notification/latest-notification.component";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        NgClass,
        NgIf,
        RouterLink,
        AsyncPipe,
        NotificationsComponent,
        LatestNotificationComponent
    ]
})
export class NavbarComponent {

  isLoggedIn = this.store.select(selectIsLoggedIn);
  team = this.store.select(selectLoggedInTeam);
  isMobileMenuOpen = false;

  hasNewNoti = this.notiService.hasNew;

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly notiService: NotificationService) { }

  toggleNoti(event: MouseEvent) {
    event.stopPropagation();
    this.notiService.setOpen(!this.notiService.isOpenR());
  }

  changeIsMobileMenuOpen(event: boolean) {
    if (event) {
      document.body.style.overflow = "hidden";
      window.scroll(0, 0);
    }
    else {
      document.body.style.overflow = "auto";
    }
    this.isMobileMenuOpen = event;
  }

  logout() {
    this.authService.logout();
  }

}
