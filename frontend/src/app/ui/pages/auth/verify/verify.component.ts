import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { CONST_ROUTES } from "src/app/constants/routes.constants";
import { AuthService } from "src/app/services/AuthService";

@Component({
  standalone: true,
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
  imports: [CommonModule],
})
export class VerifyComponent implements OnInit {
  state: "loading" | "success" | "failure" = "loading";
  private token = "";
  destroyRef = inject(DestroyRef);
  title = "Fiók aktiválása";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: HotToastService
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
            this.state = "success";
            this.alertService.success(
              "Sikeres verifikáció, mostmár bejelentkezhetsz!"
            );
            this.title = "Sikeres aktiválás!";
            this.router.navigateByUrl(CONST_ROUTES.auth.login.call);
          },
          error: () => {
            this.state = "failure";
            this.alertService.error("Sikertelen verifikáció!");
            this.title = "Fiók aktiválás sikertelen!";
          },
        });
    } else {
      this.alertService.error("Nincs verifikációs token!");
    }
  }
}
