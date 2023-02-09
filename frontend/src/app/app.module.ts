import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarModule} from "./components/navbar/navbar.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/AuthInterceptor";
import {AppRoutingModule} from "./app-routing.module";
import {HotToastModule, HotToastService} from "@ngneat/hot-toast";
import {ErrorInterceptor} from "./interceptors/ErrorInterceptor";
import {UnauthorizedInterceptor} from "./interceptors/UnauthorizedInterceptor";
import {StoreModule} from "@ngrx/store";
import {AuthReducer} from "./reducers/auth.reducer";
import {AuthService} from "./services/AuthService";
import {timeout} from "rxjs";
import {Team} from "./interfaces/team";

@NgModule({
  declarations: [
    AppComponent
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
    {provide: APP_INITIALIZER, useFactory: initializeAuth, deps: [AuthService, HotToastService], multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

function initializeAuth(authService: AuthService, alert: HotToastService): Function {
  return () => new Promise<void>((resolve) => {
    const token = authService.getToken();
    if (token) {
      console.warn("Token ready");
      const timeoutLimit = 1500;
      authService.authorizeMe().pipe(timeout(timeoutLimit)).subscribe({
        next: value => {
          if (value.success) {
            if(value.team) {
              const team: Team = value.team;
              authService.dispatchLogin(team);
            }
          }
          resolve();
        },
        error: _err => {
          if(_err.name === "TimeOutError") {
            alert.error("Request timeout, server might be down");
          }
          resolve();
        }
      });
    } else {
      console.warn("No token");
      resolve();
    }
  });
}
