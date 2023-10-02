import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/AuthInterceptor";
import { AppRoutingModule } from "./app-routing.module";
import { HotToastModule } from "@ngneat/hot-toast";
import { ErrorInterceptor } from "./interceptors/ErrorInterceptor";
import { UnauthorizedInterceptor } from "./interceptors/UnauthorizedInterceptor";
import { StoreModule } from "@ngrx/store";
import { AuthReducer } from "./store/reducers/auth.reducer";
import { AuthService } from "./services/AuthService";
import { TimeoutError, timeout } from "rxjs";
import { Modal2Component } from "./ui/components/modal2/modal2.component";
import { HostDirective } from "./directives/hostDirective";
import { GameStateReducer } from "./store/reducers/game-status.reducer";
import { NavbarComponent } from "./ui/components/navbar/navbar.component";
import { LocationInterceptor } from "./interceptors/LocationInterceptor";
import { ChatComponent } from "./ui/components/chat/chat.component";

import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { MessagingModule } from "@angular/fire/messaging";
import { environment } from "src/environments/environment";
import { AuthEffects } from "./store/effects/auth.effects";
import { EffectsModule } from "@ngrx/effects";
import { ContainerLoaderComponent } from "./ui/components/container-loader/container-loader.component";
import { NotificationService } from "./services/Notification.service";
import { LoaderService } from "./services/Loader.service";
import { ConfirmComponent } from "./ui/components/confirm/confirm.component";
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
        { provide: APP_INITIALIZER, useFactory: initializeAuth, deps: [AuthService, NotificationService, LoaderService], multi: true }
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
        MessagingModule,
        ContainerLoaderComponent,
        ConfirmComponent
    ]
})
export class AppModule {
}

function initializeAuth(authService: AuthService, alert: NotificationService, loader: LoaderService): () => Promise<void> {
  return () => new Promise<void>((resolve) => {
    const token = authService.getToken();
    if (token) {
      const timeoutLimit = 1500;
      authService.authorizeMe(true).pipe(timeout(timeoutLimit)).subscribe({
        next: () => {
          const shell = document.getElementById("szititour-shell");
          shell?.parentNode?.removeChild(shell);
          resolve();
        },
        error: _err => {
          const shell = document.getElementById("szititour-shell");
          shell?.parentNode?.removeChild(shell);
          loader.stop();
          if (_err instanceof TimeoutError) {
            alert.error("Időtúllépés, előfordulhat, hogy szerver nem elérhető. Kérlek próbáld újra késöbb!");
          }
          resolve();
        }
      });
    } else {
      const shell = document.getElementById("szititour-shell");
      shell?.parentNode?.removeChild(shell);
      resolve();
    }
  });
}
