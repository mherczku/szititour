import { Component, OnInit } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routeAnimations } from "./ui/animations/route.animation";
import { HttpClient } from "@angular/common/http";


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
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    
    
    /* this.msg.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.http
          .post("http://localhost:8080/notification", {
            target: token,
            title: "hello world",
            message: "First notification, kinda nervous",
          })
          .subscribe(() => {});

        this.http
          .post("http://localhost:8080/topic/subscription", {
            topic: "weather",
            subscriber: token,
          })
          .subscribe(() => {});
      },
      (error) => {
        console.log(error);
      }
    ); */
  }
  get getRouteAnimationData(): string {
    return (
      this.contexts.getContext("primary")?.route?.snapshot?.data?.[
        "animation"
      ] ?? this.contexts.getContext("primary")?.route?.snapshot?.toString()
    );
  }
}
