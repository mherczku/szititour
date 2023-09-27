import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/AuthInterceptor";
import {AppRoutingModule} from "./app-routing.module";
import {HotToastModule, HotToastService} from "@ngneat/hot-toast";
import {ErrorInterceptor} from "./interceptors/ErrorInterceptor";
import {UnauthorizedInterceptor} from "./interceptors/UnauthorizedInterceptor";
import {StoreModule} from "@ngrx/store";
import {AuthReducer} from "./store/reducers/auth.reducer";
import {AuthService} from "./services/AuthService";
import {timeout} from "rxjs";
import {Modal2Component} from "./ui/components/modal2/modal2.component";
import {HostDirective} from "./directives/hostDirective";
import {GameStateReducer} from "./store/reducers/game-status.reducer";
import {NavbarComponent} from "./ui/components/navbar/navbar.component";
import {LocationInterceptor} from "./interceptors/LocationInterceptor";
import { ChatComponent } from "./ui/components/chat/chat.component";

import { provideFirebaseApp, initializeApp} from "@angular/fire/app";
import { MessagingModule } from "@angular/fire/messaging";
import { environment } from "src/environments/environment";
import { AuthEffects } from "./store/effects/auth.effects";
import { EffectsModule } from "@ngrx/effects";
@NgModule({
    declarations: [
        AppComponent,
        HostDirective,
        Modal2Component
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LocationInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: initializeAuth, deps: [AuthService, HotToastService], multi: true }
    ],
    exports: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HotToastModule.forRoot({
            autoClose: true
        }),
        StoreModule.forRoot({}, {}),
        StoreModule.forFeature("game", GameStateReducer),
        StoreModule.forFeature("auth", AuthReducer),
        EffectsModule.forRoot([AuthEffects]),
        NavbarComponent,
        ChatComponent,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        MessagingModule
    ]
})
export class AppModule {
}

function initializeAuth(authService: AuthService, alert: HotToastService): Function {
  return () => new Promise<void>((resolve) => {
    const token = authService.getToken();
    if (token) {
      const timeoutLimit = 1500;
      authService.authorizeMe().pipe(timeout(timeoutLimit)).subscribe({
        next: () => resolve(),
        error: _err => {
          if(_err.name === "TimeOutError") {
            alert.error("Request timeout, server might be down");
          }
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}
