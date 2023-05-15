import {inject, NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {ActiveGameComponent} from "./ui/pages/admin/active-game/active-game.component";
import {AuthService} from "./services/AuthService";
import {PlaceComponent} from "./ui/pages/admin/place/place.component";
import {ProfileComponent} from "./ui/pages/user/profile/profile.component";

const routes: Routes = [

  /*{path: '', loadChildren: () => import('./pages/').then(m => m.HomeModule)},*/
  {
    path: "register",
    canMatch: [() => inject(AuthService).isRoleGuest()],
    data: {roles: ["ROLE_GUEST"]},
    loadComponent: () => import("./ui/pages/auth/register/register.component").then(c => c.RegisterComponent)
  },
  {
    path: "login",
    canMatch: [() => inject(AuthService).isRoleGuest()],
    data: {roles: ["ROLE_GUEST"]},
    loadComponent: () => import("./ui/pages/auth/login/login.component").then(c => c.LoginComponent)
  },
  {
    path: "admin",
    canMatch: [() => inject(AuthService).isRoleAdmin()],
    data: {roles: ["ROLE_ADMIN"]},
    loadComponent: () => import("./ui/pages/admin/games/games.component").then(c => c.GamesComponent)
  },

  {
    path: "admin/active/:id",
    canMatch: [() => inject(AuthService).isRoleAdmin()],
    data: {roles: ["ROLE_ADMIN"]},
    component: ActiveGameComponent
  },

  {
    path: "profile",
    //canMatch: [() => inject(AuthService).isLoggedIn()],
    component: ProfileComponent
  },

  {
    path: "admin/place/:gameId/:placeId",
    canMatch: [() => inject(AuthService).isRoleAdmin()],
    data: {roles: ["ROLE_ADMIN"]},
    component: PlaceComponent
  },

   /* ...["user", "felhasznalo"].map(path => ({
      path,
    //canActivateChild: [AuthGuard],
    data: {roles: ["ROLE_USER"]},
    loadChildren: () => import("./pages/user/user.routes").then(r => r.USER_ROUTES)
    })),*/
  {
    path: "user",
    //canMatch: [() => inject(AuthService).isRoleUser()],
    data: {roles: ["ROLE_USER"]},
    loadChildren: () => import("./ui/pages/user/user.routes").then(r => r.USER_ROUTES)
  },


  {path: "**", redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled", onSameUrlNavigation: "ignore"})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
