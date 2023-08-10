import { CommonModule } from "@angular/common";
import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { AuthService } from "src/app/services/AuthService";

@Component({
  standalone: true,
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"]
})
export class VerifyComponent implements OnInit {
  private token = "";
  destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: HotToastService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
    });

    /* console.log("FETCHING")
    fetch("http://localhost:8080/auth").then(r => r.json()).then(j => {console.log("fetched ", j);}); */
  }

  verifyEmail() {
    if (this.token && this.token !== "") {
      this.authService
        .verifyEmail(this.token)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.alertService.success(
              "Sikeres verifikáció, mostmár bejelentkezhetsz!"
            );
            this.router.navigateByUrl("/login");
          },
          error: (_err) => {
            this.alertService.error("Sikertelen verifikáció!");
            console.error(_err);
          },
        });
    } else {
      this.alertService.error("Nincs verifikációs token!");
    }
  }
}
