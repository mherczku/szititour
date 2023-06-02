import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {HotToastService} from "@ngneat/hot-toast";
import {AuthService} from "../../../../services/AuthService";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {confirmPassword} from "../../../../validators/same-pass.validator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {
  subscriptionRegister?: Subscription;
  registerForm!: FormGroup;

  constructor(
    private alertService: HotToastService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, confirmPassword()]],
    });
  }

  register() {
    this.subscriptionRegister = this.authService.register(this.registerForm.value.email, this.registerForm.value.password).subscribe(res => {
      if (res.success) {
        this.alertService.success("Sikeres regisztráció, bejelentkezhetsz");
        this.registerForm.reset();
        this.router.navigateByUrl("/login");
      } else {
        this.alertService.error("Hiba történt: " + res.errorMessage);
      }
    });
    this.registerForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptionRegister?.unsubscribe();
  }
}
