import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ActiveGameComponent } from "./active-game/active-game.component";
import { ProfileComponent } from "./profile/profile.component";
import { CONST_ROUTES } from "src/app/constants/routes.constants";
import { PasswordComponent } from "./password/password.component";
import { DeleteComponent } from "./delete/delete.component";


export const USER_ROUTES: Routes = [
  {
    path: CONST_ROUTES.user.home.path,
    component: HomeComponent
  },

  {
    path: CONST_ROUTES.user.active.path,
    component: ActiveGameComponent
  },
  {
    path: CONST_ROUTES.user.profile.path,
    component: ProfileComponent
  },

  {
    path: CONST_ROUTES.user.password.path,
    component: PasswordComponent
  },

  {
    path: CONST_ROUTES.user.delete.path,
    component: DeleteComponent
  },


  { path: "**", redirectTo: CONST_ROUTES.user.home.path },
];
