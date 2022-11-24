import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {UserService} from "../../services/UserService";
import {ButtonType} from "../../enums/button-type";
import {NetworkResponse} from "../../interfaces/network-response";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;

  email: string = ""
  password: string = ""
  error: string = ""

  subscriptionLogin?: Subscription

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private toastService: HotToastService) {
  }

  ngOnInit(): void {
  }

  login() {
    if (this.email === 't') {
      this.email = "t@test.hu"
      this.password = "1234"
    }
    this.subscriptionLogin = this.authService.login(this.email, this.password)
      .pipe(
        this.toastService.observe(
          {
            loading: 'Logging in...',
            success: (s) => {
              if(s.success){
                return 'Logged in'
              }
              return 'Login failed'
            },
            error: (e: HttpErrorResponse) => 'Something went wrong',
          }
        )
      ).subscribe((res: NetworkResponse) => {
      if (res.success) {
      } else {
        this.error = res.errorMessage
      }
    })

  }

  ngOnDestroy(): void {
    this.subscriptionLogin?.unsubscribe()
  }
}
