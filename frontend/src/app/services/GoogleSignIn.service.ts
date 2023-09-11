/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class GoogleSignInService {
  constructor() {}

  public initGoogleSignIn(handleSignIn: (res: any) => void) {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: handleSignIn.bind(handleSignIn),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }

  public renderButton(btnName: string) {
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById(btnName),
      { theme: "outline", size: "large", width: "100%", text: "continue_with" }
    );
  }

  public promtSignIn() {
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  public fullCycle(btnName: string, handleSignIn: (res: any) => void) {
    this.initGoogleSignIn(handleSignIn);
    this.renderButton(btnName);
    this.promtSignIn();
  }
}
