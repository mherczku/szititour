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
}


@Injectable({ providedIn: "root" })
export class NotificationService {


  private pushNotis = this.pushNoti.getNotis();
  private appNotis: WritableSignal<SzititourNotification[]> = signal([]);
  private notis: Signal<SzititourNotification[]> = computed(() => {    
    return this.pushNotis().sort((a,b) => a.time.getTime() - b.time.getTime());
  }); 


  constructor(private readonly pushNoti: PushNotificationService) {
  
    effect(() => {
      console.log(`The current count is: ${this.notis().length}`);
    });
   }



 
}
