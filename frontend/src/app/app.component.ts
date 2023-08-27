import { Component, OnInit } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routeAnimations } from "./ui/animations/route.animation";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  title = "szititour";

  constructor(
    private contexts: ChildrenOutletContexts
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  get getRouteAnimationData(): string {
    return (
      this.contexts.getContext("primary")?.route?.snapshot?.data?.[
        "animation"
      ] ?? this.contexts.getContext("primary")?.route?.snapshot?.toString()
    );
  }
}
