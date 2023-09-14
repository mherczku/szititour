import { ChangeDetectionStrategy, Component, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PushNotificationService, TopicNotification } from "src/app/services/PushNotification.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SzititourNotification } from "src/app/services/Notification.service";

@Component({
  selector: "app-notification",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  topicForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly ref: DestroyRef,
    private readonly pushService: PushNotificationService) {
    this.topicForm = this.fb.group({
      title: ["", [Validators.required]],
      msg: ["", [Validators.required]]
    });
  }

  sendTopicNotification() {
    const noti: TopicNotification = {
      topic: "default",
      title: this.topicForm.value.title,
      message: this.topicForm.value.msg
    };
    this.pushService.sendNotificationToTopic(noti).pipe(takeUntilDestroyed(this.ref)).subscribe();
    this.topicForm.reset();
  }

  testTopicNoti(inPush = false) {
    const noti: SzititourNotification = {
      id: "-2",
      title: this.topicForm.value.title,
      message: this.topicForm.value.msg,
      time: new Date(),
      icon: "assets/svg/szititour.svg",
      link: "",
      type: "PUSH"
    };
    this.pushService.trigger(noti, inPush);
  }


}
