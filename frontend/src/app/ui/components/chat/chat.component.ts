import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { ChatService, Message } from "src/app/services/ChatService";
import { popInOut } from "../../animations/pupInOut.animation";

@Component({
  standalone: true,
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  imports: [CommonModule, FormsModule],
  animations: [popInOut],
})
export class ChatComponent implements OnDestroy {
  isAdmin = true;

  content = "";
  msgs: Message[] = [];

  timeOut?: any;

  @ViewChild("chatContent")
  chatContentRef?: ElementRef;

  constructor(
    private alertService: HotToastService,
    private chatService: ChatService
  ) {
    chatService.messages?.subscribe((msg) => {
      if (msg) {
        this.msgs.push(msg);
        const scrollableDiv = this.chatContentRef?.nativeElement;
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          scrollableDiv.scrollTo({
            top: scrollableDiv.scrollHeight,
            behavior: "smooth",
          });
        }, 50);
      }
      console.log("Response from websocket: ", msg);
    });
  }

  sendMsg() {
    if(this.content.length < 1) {
      return;
    }
    const message: Message = {
      content: this.content,
      recipient: "ADMIN",
      sender: this.isAdmin ? "ADMIN" : "USER",
    };
    console.log("sending message", message);
    this.chatService.messages?.next(message);
    this.content = "";
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
    //TODO this.chatService.close()
  }
}
