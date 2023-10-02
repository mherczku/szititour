import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "src/app/services/AuthService";
import { confirmPassword } from "src/app/validators/same-pass.validator";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserService } from "src/app/services/UserService";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-password-change",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordChangeComponent implements OnInit {

  passwordForm!: FormGroup;
  $saving = signal(false);
  token = "";

  constructor(
    private readonly fb: FormBuilder,
    private readonly authS: AuthService,
    private readonly userS: UserService,
    private readonly destroyRef: DestroyRef,
    private readonly route: ActivatedRoute
  ) {

    this.passwordForm = this.fb.group({
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, confirmPassword()]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
    });
  }

  savePassword() {
    if (this.authS.$isLoggedIn()) {
      this.userS.updatePassword(this.token, this.passwordForm.value.password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    } else {
      this.authS.forgotPasswordChange(this.token, this.passwordForm.value.password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }

}
