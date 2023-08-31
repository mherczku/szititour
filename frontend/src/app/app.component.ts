import { PushNotificationService } from "src/app/services/PushNotification.service";
import { Component, OnInit } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routeAnimations } from "./ui/animations/route.animation";
import { NotificationService } from "./services/Notification.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  title = "szititour";

  constructor(
    private contexts: ChildrenOutletContexts,
    private pushNotificationService: PushNotificationService,
    private noti: NotificationService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
   /*  setInterval(() => {
      this.pushNotificationService.trigger();
    }, 20000); */
  }

  get getRouteAnimationData(): string {
    return (
      this.contexts.getContext("primary")?.route?.snapshot?.data?.[
        "animation"
      ] ?? this.contexts.getContext("primary")?.route?.snapshot?.toString()
    );
  }
}
