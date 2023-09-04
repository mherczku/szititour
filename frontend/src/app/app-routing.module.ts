import { inject, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "./services/AuthService";
import { CONST_ROUTES } from "./constants/routes.constants";

const routes: Routes = [

  /*{path: '', loadChildren: () => import('./pages/').then(m => m.HomeModule)},*/

  {
    path: CONST_ROUTES.auth.path,
    canMatch: [() => inject(AuthService).isRoleGuest()],
    data: { roles: ["ROLE_GUEST"] },
    loadChildren: () => import("./ui/pages/auth/auth.routes").then(r => r.AUTH_ROUTES)
  },

  {
    path: CONST_ROUTES.admin.path,
    canMatch: [() => inject(AuthService).isRoleAdmin()],
    data: { roles: ["ROLE_ADMIN"] },
    loadChildren: () => import("./ui/pages/admin/admin.routes").then(r => r.ADMIN_ROUTES)
  },

  {
    path: CONST_ROUTES.user.path,
    canMatch: [() => inject(AuthService).isLoggedIn()],
    data: { roles: ["ROLE_USER"] },
    loadChildren: () => import("./ui/pages/user/user.routes").then(r => r.USER_ROUTES)
  },


  /* {
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
    path: "verify/:token",
    canMatch: [() => inject(AuthService).isRoleGuest()],
    data: {roles: ["ROLE_GUEST"]},
    loadComponent: () => import("./ui/pages/auth/verify/verify.component").then(c => c.VerifyComponent)
  }, */



  /* {
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
    path: "admin/place/:gameId/:placeId",
    canMatch: [() => inject(AuthService).isRoleAdmin()],
    data: {roles: ["ROLE_ADMIN"]},
    component: PlaceComponent
  }, */

  /* ...["user", "felhasznalo"].map(path => ({
     path,
   //canActivateChild: [AuthGuard],
   data: {roles: ["ROLE_USER"]},
   loadChildren: () => import("./pages/user/user.routes").then(r => r.USER_ROUTES)
   })),*/


  { path: "**", redirectTo: CONST_ROUTES.auth.path },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", onSameUrlNavigation: "ignore" })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
