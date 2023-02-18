import {Component, OnDestroy} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import {UserService} from "../../services/UserService";
import {NetworkResponse} from "../../types/network-response";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {Subscription} from "rxjs";
import {ModalService} from "../../services/ModalService";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnDestroy {
  email = "";
  password = "";
  error = "";

  subscriptionLogin?: Subscription;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private toastService: HotToastService) {
  }

  login() {
    if (this.email === "t") {
      this.email = "t@test.hu";
      this.password = "T12345678";
    }
    this.subscriptionLogin = this.authService.login(this.email, this.password)
      .pipe(
        this.toastService.observe(
          {
            loading: "Bejelentkezés...",
            success: (s) => {
              if (s.success) {
                return "Sikeres bejelentkezés";
              }
              return "Sikertelen bejelentkezés";
            },
            error: _arg => {
              return "Hibás email vagy jelszó";
            }
          }
        )
      ).subscribe((res: NetworkResponse) => {
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
