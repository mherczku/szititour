/* eslint-disable no-empty */
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { AuthService } from "../../../../services/AuthService";
import { UserService } from "../../../../services/UserService";
import { NetworkResponse } from "../../../../types/network-response";
import { Router, RouterLink } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { environment } from "src/environments/environment";

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
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastService: HotToastService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%", text: "continue_with" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.authService.continueWithGoogle(response.credential).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

  }

  login() {
    if (this.email === "t" || this.email === "t@test.hu") {
      this.email = "t@test.hu";
      this.password = "T12345678";
    }
    this.subscriptionLogin = this.authService
      .login(this.email, this.password)
      .pipe(
        this.toastService.observe({
          loading: "Bejelentkezés...",
          success: (s) => {
            if (s.success) {
              return "Sikeres bejelentkezés";
            }
            return "Sikertelen bejelentkezés";
          },
          error: (_arg) => {
            return "Hibás email vagy jelszó";
          },
        })
      )
      .subscribe((res: NetworkResponse) => {
        if (res.success) {
        } else {
          this.error = res.errorMessage;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptionLogin?.unsubscribe();
  }
}
