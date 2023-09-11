import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { FirebaseApp } from "@angular/fire/app";
import { getMessaging, getToken, onMessage } from "@angular/fire/messaging";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NetworkResponse } from "../types/network-response";
import { SzititourNotification } from "./Notification.service";


interface AppNotification {
  title: string;
  message: string;
}

export interface TopicNotification extends AppNotification {
  topic: string;
}

interface DirectNotification extends AppNotification {
  target: string;
}

interface SubscriptionRequest {
  subscriber?: string;
  topic: string;
}

@Injectable({ providedIn: "root" })
export class PushNotificationService {
  trigger() {
    console.log("triggering");

    this.notifications.update(v => {
      v.push({
        id: crypto.randomUUID(),
        icon: "",
        link: "",
        type: "PUSH",
        time: new Date(),
        message: "message",
        title: "title"
      });
      return v;
    });
  }
  private baseUrl = environment.apiBaseUrl;

  private token?: string;

  private notifications: WritableSignal<SzititourNotification[]> = signal([]);

  constructor(private http: HttpClient, private fireApp: FirebaseApp) { }

  public getNotis(): Signal<SzititourNotification[]> {
    return this.notifications.asReadonly();
  }

  public initializePushNoti() {
    Notification.requestPermission().then((res) => {
      console.log(res);

      if (res === "granted") {

        const m: any = getMessaging(this.fireApp);

        if(environment.production) {

          navigator.serviceWorker.register("/szitiour/firebase-messaging-sw.js").then((registration) => {
            console.warn("MAJOM", m, navigator.serviceWorker);
            m.swRegistration = registration;
            console.log(registration, m.swRegistration, registration === m.swRegistration)
            // Request permission and get token.....
          });
        }
        getToken(m, { vapidKey: environment.vpKey }).then((res) => {
          this.token = res;
        });
        onMessage(m, (payload) => {
          console.log("Message received. ", payload);
          this.notifications.update(v => {
            v.push({
              id: crypto.randomUUID(),
              icon: payload.notification?.icon ?? "",
              link: "",
              type: "PUSH",
              time: new Date(),
              message: payload.notification?.body ?? "message",
              title: payload.notification?.title ?? "title"
            });
            return v;
          });
        });
      }
    });
  }

  public popOne(): SzititourNotification | undefined {
    let toReturn;
    this.notifications.update(n => {
      toReturn = n.pop();
      return n;
    });

    return toReturn;
  }

  public getTopics(request: SubscriptionRequest): Observable<string[]> {

    if (this.token) {
      const req = {
        ...request,
        subscriber: this.token
      };
      return this.http.post<string[]>(`${this.baseUrl}/notification/topics`, req);
    } else {
      throw new Error("Push Noti GetTopics error: No Token");
    }
  }

  public subscribeToTopic(request: SubscriptionRequest): Observable<string[]> {
    if (this.token) {
      const req = {
        ...request,
        subscriber: this.token
      };
      return this.http.post<string[]>(`${this.baseUrl}/notification/subscribe`, req);
    } else {
      throw new Error("Push Noti Subscribe error: No Token");
    }
  }

  public unsubscribeFromTopic(request: SubscriptionRequest): Observable<string[]> {
    if (this.token) {
      const req = {
        ...request,
        subscriber: this.token
      };
      return this.http.post<string[]>(`${this.baseUrl}/notification/unsubscribe`, req);
    } else {
      throw new Error("Push Noti Unsubscribe error: No Token");
    }
  }

  public sendNotificationToTopic(notification: TopicNotification): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/noti/topic`, notification);
  }

  public sendNotificationToTarget(notification: DirectNotification): Observable<NetworkResponse> {
    return this.http.post<NetworkResponse>(`${this.baseUrl}/noti/direct`, notification);
  }
}
