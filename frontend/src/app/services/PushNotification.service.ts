import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { FirebaseApp } from "@angular/fire/app";
import { Messaging, getMessaging, getToken, onMessage } from "@angular/fire/messaging";
import { Observable, tap } from "rxjs";
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

  private baseUrl = environment.apiBaseUrl;

  private token?: string;

  private notifications: WritableSignal<SzititourNotification[]> = signal([]);

  constructor(private http: HttpClient, private fireApp: FirebaseApp) { }

  public getNotis(): Signal<SzititourNotification[]> {
    return this.notifications.asReadonly();
  }

  $state: WritableSignal<"true" | "false" | "loading" | "blocked"> = signal("false");

  public requestPushNoti() {
    this.$state.set("loading");
    Notification.requestPermission().then((res) => {
      if (res === "granted") {
        const m: any = getMessaging(this.fireApp);
        if (environment.production) {
          navigator.serviceWorker.register("/szititour/firebase-messaging-sw.js").then((registration) => {
            m.swRegistration = registration;
            this.handleRegistration(m, registration, true);
          });
        } else {
          this.handleRegistration(m, undefined, true);
        }
      } else {
        this.$state.set("blocked");
      }
    });
  }

  public initializePushNoti() {
    this.$state.set("loading");
    if (Notification.permission === "granted") {
      const m: any = getMessaging(this.fireApp);
      if (environment.production) {
        navigator.serviceWorker.register("/szititour/firebase-messaging-sw.js").then((registration) => {
          m.swRegistration = registration;
          this.handleRegistration(m, registration);
        });
      } else {
        this.handleRegistration(m);
      }
    } else {
      this.$state.set("blocked");
    }
  }

  public trigger(noti?: SzititourNotification, inPush = false) {

    if (inPush) {
      new Notification(noti?.title ?? "Test", {
        body: noti?.message ?? "Test message",
        icon: "../../assets/svg/szititour.svg"
      });
      return;
    }

    if (noti) {
      this.notifications.update(n => {
        n.push(noti);
        return n;
      });
      return;
    }
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

  private handleRegistration(messaging: Messaging, prodReg?: ServiceWorkerRegistration, isRequest = false) {

    getToken(messaging, { vapidKey: environment.vpKey, serviceWorkerRegistration: prodReg }).then((res) => {
      this.token = res;
      this.getTopics({ topic: "default" }).subscribe(r => {
        if (r.includes("default")) {
          this.$state.set("true");
        } else {

          if (isRequest) {
            this.subscribeToTopic().subscribe(r => {
              if (r.includes("default")) {
                this.$state.set("true");
              }
            });
          } else {
            this.$state.set("false");
          }

        }
      });
    });
    onMessage(messaging, (payload) => {
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

  public subscribeToTopic(request: SubscriptionRequest = { topic: "default" }): Observable<string[]> {
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

  public unsubscribeFromTopic(request: SubscriptionRequest = { topic: "default" }): Observable<string[]> {
    if (this.token) {
      const req = {
        ...request,
        subscriber: this.token
      };
      this.$state.set("loading");
      return this.http.post<string[]>(`${this.baseUrl}/notification/unsubscribe`, req).pipe(tap(r => {
        if (r.includes("default")) {
          this.$state.set("true");
        } else {
          this.$state.set("false");
        }
      }));
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
