import { Component, OnInit } from '@angular/core';
import {ButtonType} from "../../enums/button-type";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ButtonType = ButtonType;

  constructor() { }

  ngOnInit(): void {
  }

}
