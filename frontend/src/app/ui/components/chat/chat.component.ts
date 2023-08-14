import { CommonModule } from "@angular/common";
import {
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
  WritableSignal,
  computed,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { ChatService, Message } from "src/app/services/ChatService";
import { popInOut } from "../../animations/pupInOut.animation";
import { chatCollapse } from "../../animations/chatCollapse.animation";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthService } from "src/app/services/AuthService";

interface AdminChat {
  newMessages: Signal<number>;
  users: SimpleUser[];
  selectedUser?: SimpleUser;
}

interface SimpleUser {
  name: string;
  online: boolean;
  newMessages: number;
  messages: Message[];
}

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

  adminChat: WritableSignal<AdminChat> = signal({
    users: [
      {
        name: "Nincs üzenet",
        online: false,
        newMessages: 0,
        messages: [],
      },
    ],
    newMessages: computed(() => {
      let a = 0;
      this.adminChat().users.forEach((user) => (a += user.newMessages));
      return a;
    }),
  });

  content = "";
  msgs: Message[] = [];

  timeOut?: any;

  @ViewChild("chatContent")
  chatContentRef?: ElementRef;

  constructor(
    private alertService: HotToastService,
    private chatService: ChatService,
    private destroyRef: DestroyRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //TODO only if user wants to chat
    this.isAdmin = this.authService.isRoleAdmin();
    this.connect();
    this.adminChat.update((chat: AdminChat) => {
      chat.selectedUser = chat.users[0];
      return chat;
    });
  }

  connect() {
    this.chatService.initializeChat(this.isAdmin);
    this.subscribeToMessages();
  }

  subscribeToMessages() {
    this.chatService.messages
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((msg) => {
        if (msg?.type === "MSG") {
          this.handleMSG(msg);
        } else if (msg?.type === "INFO") {
          this.handleINFO(msg);
        } else if (msg?.type === "LEAVE") {
          this.handleLEAVE(msg);
        }
        console.log("Response from websocket: ", msg);
        console.log(this.adminChat().users.length);
      });
  }

  handleINFO(msg: Message) {
    msg.info.forEach((name) => {
      this.adminChat().users.push({
        name: name,
        online: true,
        newMessages: 0,
        messages: [],
      });
    });
  }


  handleLEAVE(msg: Message) {
    this.adminChat.update(chat => {
      const user = chat.users.find(user => user.name === msg.sender);
      if(user) {
        user.online = false;
      }
      return chat;
    });
  
  }

  hide(event: Event) {
    this.isHidden = true;
    event.stopPropagation();
  }
  toggle() {
    this.isHidden = !this.isHidden;

    if (this.first) {
      this.first = false;
    }
  }

  sendMsg() {
    if (this.content.length < 1) {
      return;
    }
    const message: Message = {
      content: this.content,
      recipient: this.isAdmin
        ? this.adminChat().selectedUser?.name ?? "ALMAAA"
        : "ADMIN",
      sender: this.isAdmin ? "ADMIN" : this.authService.getUsername(),
      type: "MSG",
      info: [],
      token: "",
    };
    console.log("sending message", message);
    this.chatService.messages?.next(message);
    this.content = "";
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
    this.chatService.close();
  }

  handleMSG(msg: Message) {
    if (this.isAdmin) {
      const sender = this.adminChat().users.find(
        (user) => user.name === msg.sender || user.name === msg.recipient
      );
      if (sender) {
        sender.newMessages++;
        sender.messages.push(msg);
        this.adminChat().selectedUser = sender;
        this.adminChat.set(this.adminChat());
        console.log("van .", this.adminChat().selectedUser);

        return;
      } else {
        const newSender: SimpleUser = {
          messages: [msg],
          name: msg.sender,
          online: true,
          newMessages: 1,
        };
        this.adminChat().users.push(newSender);
        this.adminChat().selectedUser = newSender;
        this.adminChat.set(this.adminChat());

        console.log("uj .", this.adminChat().selectedUser);
        return;
      }
    }

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

  resetSelectedCounter() {
    console.log("resetSelectedCounter");
    
    this.adminChat.update(chat => {
      chat.selectedUser?.newMessages ? chat.selectedUser.newMessages = 0 : 0;
      return chat;
    });

  }
}
