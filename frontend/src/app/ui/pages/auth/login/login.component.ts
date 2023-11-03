import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from "@angular/core";
import { AuthService } from "../../../../services/AuthService";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GoogleSignInService } from "src/app/services/GoogleSignIn.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [FormsModule, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  error = "";

  constructor(
    private readonly authService: AuthService,
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
      this.email = "t@test.hu";
      this.password = "T12345678910";
    }
    else if (this.email === "ta" || this.email === "ta@test.hu") {
      this.email = "ta@test.hu";
      this.password = "T12345678910";
    }
    this.authService
      .login(this.email, this.password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
