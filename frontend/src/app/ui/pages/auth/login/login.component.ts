import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { AuthService } from "../../../../services/AuthService";
import { NetworkResponse } from "../../../../types/network-response";
import { RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GoogleSignInService } from "src/app/services/GoogleSignIn.service";
import { NotificationService } from "src/app/services/Notification.service";
import { CONST_MESSAGES } from "src/app/constants/messages-be.constants";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [FormsModule, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  email = "";
  password = "";
  error = "";

  subscriptionLogin?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly notiService: NotificationService,
    private readonly destroyRef: DestroyRef,
    private readonly googleSignInService: GoogleSignInService
  ) {}

  ngOnInit() {
    this.googleSignInService.fullCycle("google-button", (res: any) => {
      this.handleCredentialResponse(res);
    });
  }

  handleCredentialResponse(response: any) {
    this.authService.continueWithGoogle(response.credential).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

  }

  login() {
    if (this.email === "t" || this.email === "tu@test.hu") {
      this.email = "tu@test.hu";
      this.password = "T12345678";
    }
    else if (this.email === "ta" || this.email === "ta@test.hu") {
      this.email = "ta@test.hu";
      this.password = "T12345678";
    }
    this.subscriptionLogin = this.authService
      .login(this.email, this.password)
      .subscribe((res: NetworkResponse) => {
        if (res.success) {
          this.notiService.succes(CONST_MESSAGES.LOGIN_SUCCESS);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptionLogin?.unsubscribe();
  }
}
