import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { VerifyComponent } from "./verify/verify.component";
import { CONST_ROUTES } from "src/app/constants/routes.constants";

export const AUTH_ROUTES: Routes = [
  {
    path: CONST_ROUTES.auth.register.path,
    component: RegisterComponent
  },

  {
    path: CONST_ROUTES.auth.login.path,
    component: LoginComponent
  },

  {
    path: CONST_ROUTES.auth.verify.path,
    component: VerifyComponent
  },


  { path: "**", redirectTo: CONST_ROUTES.auth.login.path },
];

