import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "../actions/auth.actions";
import { PushNotificationService } from "src/app/services/PushNotification.service";
import { tap } from "rxjs";
import { CONST_ROUTES } from "src/app/constants/routes.constants";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly pushNoti: PushNotificationService,
    private readonly router: Router
  ) {
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      tap(action => {
        if(action.team.role === "ROLE_ADMIN") {
          if(action.notAuto) {
            this.router.navigateByUrl(CONST_ROUTES.admin.call);
          }
        } else if(action.team.role === "ROLE_USER") {
          if(action.notAuto) {
            this.router.navigateByUrl(CONST_ROUTES.user.call);
          }
        }
        this.pushNoti.initializePushNoti();
      }),
    ), { dispatch: false }
  );
}
