import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "src/app/services/UserService";
import { NotificationService } from "src/app/services/Notification.service";
import { ConfirmService } from "src/app/services/Confirm.service";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CONST_ROUTES } from "src/app/constants/routes.constants";
import { AuthService } from "src/app/services/AuthService";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteComponent implements OnInit {

  token = "";

  constructor(
    private readonly userS: UserService,
    private readonly authS: AuthService,
    private readonly destroyRef: DestroyRef,
    private readonly notiS: NotificationService,
    private readonly confirmS: ConfirmService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params["token"];

      this.confirmS.confirm(
        {
          question: "Biztos törölni szeretnéd a fiókod?",
          confirmText: "Fiók törlése!"
        },
        () => {
          this.userS.deleteAccount(this.token).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
              this.notiS.success("Fiók sikeresen törölve");
              this.authS.removeToken();
              this.authS.logout();
            }
          });
        },
        () => {
          this.router.navigateByUrl(CONST_ROUTES.user.call);
        }
      );

    });
  }

}
