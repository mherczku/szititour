import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [

  /*{path: '', loadChildren: () => import('./pages/').then(m => m.HomeModule)},*/
  {
    path: 'register',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/admin/games/games.module').then(m => m.GamesModule)
  },

  {
    path: 'admin-place/:id',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/admin/place/place.module').then(m => m.PlaceModule),
  },

  {path: '**', redirectTo: 'login'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
