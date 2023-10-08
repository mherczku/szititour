import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { AuthService, RegisterData } from "../../../../services/AuthService";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { confirmPassword } from "../../../../validators/same-pass.validator";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GoogleSignInService } from "src/app/services/GoogleSignIn.service";
import { CONST_ROUTES } from "src/app/constants/routes.constants";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly destroyRef: DestroyRef,
    private readonly googleSignInService: GoogleSignInService
  ) {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, confirmPassword()]],
    });
  }

  ngOnInit() {
    this.googleSignInService.fullCycle("google-button2", (res: any) => {
      this.handleCredentialResponse(res);
    });
  }

  handleCredentialResponse(response: any) {
    this.authService.continueWithGoogle(response.credential).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

  }

  register() {
    const registerData: RegisterData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name
    };
    this.authService.register(registerData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      if (res.success) {
        this.registerForm.reset();
        this.router.navigateByUrl(CONST_ROUTES.auth.login.call);
      }
    });
  }
}
