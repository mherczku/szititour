import { CommonModule } from "@angular/common";
import { Component, DestroyRef, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { ChatService, Message } from "src/app/services/ChatService";
import { popInOut } from "../../animations/pupInOut.animation";
import { chatCollapse } from "../../animations/chatCollapse.animation";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  imports: [CommonModule, FormsModule],
  animations: [popInOut, chatCollapse],
})
export class ChatComponent implements OnInit, OnDestroy {

  isAdmin = true;
  isHidden = true;
  first = true;

  content = "";
  msgs: Message[] = [];

  timeOut?: any;

  @ViewChild("chatContent")
  chatContentRef?: ElementRef;

  constructor(
    private alertService: HotToastService,
    private chatService: ChatService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    //TODO only if user wants to chat
    this.connect();
  }

  connect() {
    this.chatService.initializeChat(this.isAdmin);
    this.subscribeToMessages();
  }

  subscribeToMessages() {
    this.chatService.messages?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((msg) => {
      if (msg?.type === "MSG") {
        this.handleMSG(msg);
      } else if (msg?.type === "INFO") {
        this.handleINFO(msg);
      }
      console.log("Response from websocket: ", msg);
    });
  }
  
  handleINFO(msg: Message) {
    throw new Error("Method not implemented.");
  }

  hide(event: Event) {
    this.isHidden = true;
    event.stopPropagation();

  }
  toggle() {
    this.isHidden = !this.isHidden;

    if(this.first) {
      
      this.first = false;
    }

  }

  sendMsg() {
    if (this.content.length < 1) {
      return;
    }
    const message: Message = {
      content: this.content,
      recipient: "ADMIN",
      sender: this.isAdmin ? "ADMIN" : "USER",
      type: "MSG",
      info: [],
      token: ""
    };
    console.log("sending message", message);
    this.chatService.messages?.next(message);
    this.content = "";
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
    //TODO this.chatService.close()
  }

  handleMSG(msg: Message) {
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
}
 

