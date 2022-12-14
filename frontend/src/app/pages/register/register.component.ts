import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonType} from "../../enums/button-type";
import {HotToastService} from "@ngneat/hot-toast";
import {AuthService} from "../../services/AuthService";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;

  email: string = "";
  password: string = "";
  passwordConfirm: string = "";
  registering: boolean = false;

  subscriptionRegister?: Subscription

  //registerForm!: FormGroup;

  constructor(
    private alertService: HotToastService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //this.setForm()
  }

/*  setForm() {
    this.registerForm = this.fb.group({
      email: ['alma', [Validators.required]],
      lastName: [],
      age: []
    });
  }*/

  // todo validators
  register() {
    if (this.email !== "" && this.password !== "") {
      if (this.password === this.passwordConfirm) {
        this.subscriptionRegister = this.authService.register(this.email, this.password).subscribe(res => {
          if (res.success) {
            this.alertService.success("Sikeres regisztráció, bejelentkezhetsz")
            this.router.navigateByUrl("/login")
          } else {
            this.alertService.error("Hiba történt: " + res.errorMessage)
          }
        })
      } else {
        this.alertService.warning("Jelszavak különböznek")
      }
    } else {
      this.alertService.warning("Minden mező kitöltése kötelező")
    }
  }

  ngOnDestroy(): void {
    this.subscriptionRegister?.unsubscribe()
  }
}
