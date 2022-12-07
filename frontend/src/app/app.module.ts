import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {GridImageComponent} from './components/grid-image/grid-image.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarModule} from "./components/navbar/navbar.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/AuthInterceptor";
import {AppRoutingModule} from "./app-routing.module";
import {HotToastModule} from "@ngneat/hot-toast";
import {ErrorInterceptor} from "./interceptors/ErrorInterceptor";
import {UnauthorizedInterceptor} from "./interceptors/UnauthorizedInterceptor";
import {StoreModule} from '@ngrx/store';
import {AuthReducer} from "./reducers/auth.reducer";
import {AuthService} from "./services/AuthService";
import {Team} from "./interfaces/team";

@NgModule({
  declarations: [
    AppComponent,
    GridImageComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    StoreModule.forRoot({auth: AuthReducer}, {})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initializeAuth, deps: [AuthService], multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

function initializeAuth(authService: AuthService): Function {
  return () => new Promise<void>((resolve) => {
    const token = authService.getToken()
    if (token) {
      console.warn("Token ready")
      authService.authorizeMe().subscribe({
        next: value => {
          if (value.success) {
            const team: Team = value.team
            authService.dispatchLogin(team)
          }
          resolve()
        },
        error: _err => {
          resolve()
        }
      })
    } else {
      console.warn("No token")
      resolve()
    }
  })
}
