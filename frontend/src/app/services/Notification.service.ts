import { Injectable, Signal, WritableSignal, computed, effect, signal } from "@angular/core";
import { PushNotificationService } from "./PushNotification.service";
import { genUUID } from "../e-functions/extension-functions";


export interface SzititourNotification {
  id: string;
  title: string;
  message: string;
  time: Date;
  icon: string;
  link: string;
  type: "PUSH" | "APP";
  isSeen?: boolean;
}


@Injectable({ providedIn: "root" })
export class NotificationService {

  latestNoti: WritableSignal<SzititourNotification | undefined> = signal(undefined);

  private pushNotis = this.pushNoti.getNotis();

  private notis: WritableSignal<SzititourNotification[]> = signal([]);

  public hasNew: Signal<boolean> = computed(() => {
    let isNew = false;
    this.notis().forEach(n => {
      if (n.isSeen !== true) {
        isNew = true;
      }
    });
    return isNew;
  });


  private isOpen: WritableSignal<boolean> = signal(false);
  public isOpenR = this.isOpen.asReadonly();

  public setOpen(value: boolean) {
    if (value && this.latestNoti()) {
      this.latestNoti.set(undefined);
      setTimeout(() => {
        this.isOpen.set(value);
      }, 200);
    } else {
      this.isOpen.set(value);
    }
  }

  public error(message: string) {
    console.log("Errr")
    if(!message || message.length < 1) {
      return;
    }
    const n: SzititourNotification = {
      id: genUUID(),
      title: "Hiba történt",
      message: message,
      time: new Date(),
      icon: "assets/svg/warning-yellow.svg",
      link: "",
      type: "APP"
    };
    this.pushToNotis(n);
  }

  public success(title: string, message = "") {
    if(!title || title.length < 1) {
      return;
    }
    const n: SzititourNotification = {
      id: genUUID(),
      title: title,
      message: message,
      time: new Date(),
      icon: "assets/svg/success.svg",
      link: "",
      type: "APP"
    };
    this.pushToNotis(n);
  }

  trigger() {
    this.pushToNotis({
      id: "1",
      title: "Test",
      message: "Az almák lehetnek zöldek vagy pirosak, ha az alma lila akkor nem jó!",
      time: new Date(),
      icon: "assets/svg/notification.svg",
      link: "/admin/place/1",
      type: "APP",
      isSeen: false
    });
  }

  constructor(private readonly pushNoti: PushNotificationService) {

    effect(() => {
      if (this.isOpen()) {
        this.latestNoti.set(undefined);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      if (this.pushNotis().length > 0) {
        this.take1FromPush();
      }
    }, { allowSignalWrites: true });
  }

  private take1FromPush() {
    const newNoti = this.pushNoti.popOne();
    if (newNoti) {
      this.pushToNotis(newNoti);
    }
  }

  private pushToNotis(noti: SzititourNotification) {
    if (!this.isOpen()) {
      this.latestNoti.set(noti);
      setTimeout(() => {
        this.latestNoti.set(undefined);
      }, 3000);
    }
    this.notis.update(n => {
      n.push(noti);
      return n;
    });
  }

  public removeNotiByIndex(index: number) {
    this.notis.update(n => {
      const noti = n[index];
      if (noti.id === this.latestNoti()?.id) {
        this.latestNoti.set(undefined);
      }
      n.splice(index, 1);
      return n;
    });
  }

  public removeNoti(noti: SzititourNotification) {
    this.removeNotiByIndex(this.notis().indexOf(noti));
  }

  public seenNoti(noti: SzititourNotification, isSeen = true) {
    this.notis.update(n => {
      const i = n.indexOf(noti);
      n[i].isSeen = isSeen;
      return n;
    });
  }

  public getNotifications(): Signal<SzititourNotification[]> {
    return this.notis;
  }

  seenAllNotifications() {
    this.notis.update(notifications => {
      notifications.forEach(n => {
        n.isSeen = true;
      });
      return notifications;
    });
  }
  removeAllNotifications() {
    this.notis.set([]);
  }

}
