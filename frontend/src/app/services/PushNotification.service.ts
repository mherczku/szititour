import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire/app";
import { getMessaging, getToken, onMessage } from "@angular/fire/messaging";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class PushNotificationService {
  private baseUrl = environment.apiBaseUrl;

  private username = "GUEST";

  constructor(private http: HttpClient, private fireApp: FirebaseApp) {}

  public initializePushNoti() {
    Notification.requestPermission().then((res) => {
      console.log(res);

      if (res !== "denied") {
        const m = getMessaging(this.fireApp);
        getToken(m, { vapidKey: environment.vpKey }).then((res) => {
          console.log(res);
        });
        onMessage(m, (payload) => {
          console.log("Message received. ", payload);
          //this.newMessage=payload;
        });
      }
    });
  }

  public subscribeToTopic() {
    this.http
          .post("http://localhost:8080/notification", {
            target: token,
            title: "hello world",
            message: "First notification, kinda nervous",
          });
  }

  public sendNotificationToTopic() {
    this.http
          .post("http://localhost:8080/topic/subscription", {
            topic: "weather",
            subscriber: token,
          });
  }
}
