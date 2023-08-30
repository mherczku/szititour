import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as actions from "../actions/auth.actions";
import { PushNotificationService } from "src/app/services/PushNotification.service";
import { tap } from "rxjs";

@Injectable()
export class LoginEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly pushNoti: PushNotificationService
  ) {
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      tap(() => {
        this.pushNoti.initializePushNoti();
      }),
    ), {dispatch: false}
  );
}
