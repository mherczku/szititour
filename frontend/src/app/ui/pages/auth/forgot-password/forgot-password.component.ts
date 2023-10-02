import { ChangeDetectionStrategy, Component, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "src/app/services/AuthService";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { NotificationService } from "src/app/services/Notification.service";
import { validateEmail } from "src/app/e-functions/extension-functions";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {

  email = "";

  constructor(
    private readonly authS: AuthService,
    private readonly notiS: NotificationService,
    private readonly destroyRef: DestroyRef
  ) {}

  sendForgotRequest() {
    if(validateEmail(this.email)){
      this.authS.requestForgotPassword(this.email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
    } else {
      this.notiS.error("E-mail cím formátuma nem megfelelő!");
    }
  }

}
