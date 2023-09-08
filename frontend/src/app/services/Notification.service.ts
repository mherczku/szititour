import { Injectable, Signal, WritableSignal, computed, effect, signal } from "@angular/core";
import { PushNotificationService } from "./PushNotification.service";


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

  private latestNoti?: SzititourNotification;

  private pushNotis = this.pushNoti.getNotis();

  private notis: WritableSignal<SzititourNotification[]> = signal([]);

  public hasNew: Signal<boolean> = computed(() => {
    let isNew = false;
    this.notis().forEach(n => {
      if(n.isSeen !== true) {
        isNew = true;
      }
    });
    return isNew;
  });


  public isOpen: WritableSignal<boolean> = signal(true);

  constructor(private readonly pushNoti: PushNotificationService) {


    this.pushToNotis({
      id: "1",
      title: "Alma",
      message: "Az almák lehetnek zöldek vagy pirosak, ha az alma lila akkor nem jó!",
      time: new Date(),
      icon: "assets/svg/notification.svg",
      link: "/admin/place/1",
      type: "APP",
      isSeen: true
    });
    this.pushToNotis({
      id: "1",
      title: "Alma",
      message: "Az almák lehetnek zöldek vagy pirosak, ha az alma lila akkor nem jó!",
      time: new Date(),
      icon: "assets/svg/notification.svg",
      link: "/admin/place/1",
      type: "APP",
      isSeen: false
    });

    effect(() => {
      console.log(`The current count is: ${this.notis().length}`);
      console.log(`The current push count is: ${this.pushNotis().length}`);
    });

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
    this.notis.update(n => {
      n.push(noti);
      return n;
    });
  }

  public removeNotiByIndex(index: number) {
    this.notis.update(n => {
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
