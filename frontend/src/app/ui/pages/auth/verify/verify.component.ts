import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { CONST_ROUTES } from "src/app/constants/routes.constants";
import { AuthService } from "src/app/services/AuthService";
import { NotificationService } from "src/app/services/Notification.service";

@Component({
  standalone: true,
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyComponent implements OnInit {

  $state: WritableSignal<"loading" | "success" | "failure"> = signal("loading");
  private token = "";
  destroyRef = inject(DestroyRef);
  title = "Fiók aktiválása";

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly alertService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
      setTimeout(() => {
        this.verifyEmail();
      }, 1000);
    });
  }

  verifyEmail() {
    if (this.token && this.token !== "") {
      this.authService
        .verifyEmail(this.token)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.$state.set("success");
            this.alertService.success(
              "Sikeres verifikáció, mostmár bejelentkezhetsz!"
            );
            this.title = "Sikeres aktiválás!";
            this.router.navigateByUrl(CONST_ROUTES.auth.login.call);
          },
          error: () => {
            this.$state.set("failure");
            this.alertService.error("Sikertelen verifikáció!");
            this.title = "Fiók aktiválás sikertelen!";
          },
        });
    } else {
      this.alertService.error("Nincs verifikációs token!");
    }
  }
}
