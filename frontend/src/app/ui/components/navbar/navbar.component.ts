import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { AuthService } from "../../../services/AuthService";
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

  $isNgRok = signal(document.cookie.includes("ngrok"));
  $isLoggedIn = computed(() => this.$team() !== undefined);
  $isAdmin = this.authService.$isAdmin;
  $team = this.authService.$currentTeamR;
  $isMobileMenuOpen = signal(false);
  $hasNewNoti = this.notiService.hasNew;

  constructor(
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
    this.$isMobileMenuOpen.set(event);
  }

  logout() {
    this.authService.logout();
  }

  ngRok() {
    window.open("https://dolphin-casual-deer.ngrok-free.app/", "_blank");
    this.setCookie("ngrok", "ngrok", 7);
    this.$isNgRok.set(true);
  }

  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}
