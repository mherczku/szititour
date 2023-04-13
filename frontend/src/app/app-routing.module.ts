import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {ActiveGameComponent} from "./ui/pages/admin/active-game/active-game.component";

const routes: Routes = [

  /*{path: '', loadChildren: () => import('./pages/').then(m => m.HomeModule)},*/
  {
    path: "register",
    canActivateChild: [AuthGuard],
    data: {roles: ["ROLE_GUEST"]},
    loadChildren: () => import("./ui/pages/auth/register/register.module").then(m => m.RegisterModule)
  },
  {
    path: "login",
    canActivateChild: [AuthGuard],
    data: {roles: ["ROLE_GUEST"]},
    loadChildren: () => import("./ui/pages/auth/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "admin",
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {roles: ["ROLE_ADMIN"]},
    loadChildren: () => import("./ui/pages/admin/games/games.module").then(m => m.GamesModule)
  },

  {
    path: "admin/active/:id",
    //canLoad: [AuthGuard],
    //canActivateChild: [AuthGuard],
    data: {roles: ["ROLE_ADMIN"]},
    component: ActiveGameComponent
  },

   /* ...["user", "felhasznalo"].map(path => ({
      path,
    //canActivateChild: [AuthGuard],
    data: {roles: ["ROLE_USER"]},
    loadChildren: () => import("./pages/user/user.routes").then(r => r.USER_ROUTES)
    })),*/
  {
    path: "user",
    //canActivateChild: [AuthGuard],
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
