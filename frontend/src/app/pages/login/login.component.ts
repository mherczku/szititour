import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {UserService} from "../../services/UserService";
import {ButtonType} from "../../enums/button-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ButtonType = ButtonType;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login("t@test.hu", "1234").subscribe(res => {
      console.log(res, "res")
    })

  }
}
