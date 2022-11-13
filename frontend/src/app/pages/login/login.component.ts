import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {UserService} from "../../services/UserService";
import {ButtonType} from "../../enums/button-type";
import {NetworkResponse} from "../../interfaces/network-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ButtonType = ButtonType;

  email: string = ""
  password: string = ""
  error: string = ""

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    if(this.email === 't') {
      this.email = "t@test.hu"
      this.password = "1234"
    }
    this.authService.login(this.email, this.password).subscribe((res: NetworkResponse) => {
      console.log(res, "res")
      if(res.success){
        this.router.navigateByUrl("/admin")
      } else {
        this.error = res.errorMessage
      }
    })

  }
}
