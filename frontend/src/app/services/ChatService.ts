import { Injectable, WritableSignal, effect, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer, Subject, map } from "rxjs";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { environment } from "src/environments/environment";
import { AuthService } from "./AuthService";

export interface Message {
  content: string
  sender: string
  recipient: string
  type: "MSG" | "INFO" | "AUTH" | "LEAVE" | "JOIN" | "ALREADY_OPEN"
  info: string[]
  token: string
}

@Injectable({ providedIn: "root" })
export class ChatService {
  private baseUrl = "";

  private subject?: AnonymousSubject<MessageEvent>;
  public messages?: Subject<Message>;

  private ws!: WebSocket;

  readonly isAdmin = this.authService.isAdminSignal;
  user = this.authService.currentUserSignalR;
  initialized = false;
  signalToComponent: WritableSignal<Subject<Message> | undefined> = signal(undefined);


  // todo init chat by authservice isadmin no component, init only if user want to private

  constructor(private http: HttpClient, private authService: AuthService) {

    effect(() => {
      console.log("reconnext 0000");
      if (this.user() && this.initialized) {
        console.log("reconnext chat service");

        this.initializeChat();
      } else {
        this.close();
      }
    }, { allowSignalWrites: true });
  }

  obs = new Subject<number>();

  public initializeChat() {
    this.initialized = true;
    this.baseUrl = this.isAdmin() ? environment.apiWebsocketUrlAdmin : environment.apiWebsocketUrlUser;

    this.messages = <Subject<Message>>this.connect().pipe(
      map((response: MessageEvent): Message => {
        console.log("got repsonse", response.data);
        const data = JSON.parse(response.data);
        return data;
      })
    );
    console.log("initialied c s");

    this.signalToComponent.set(this.messages);
  }

  private connect(): AnonymousSubject<MessageEvent> {
    this.subject = this.createWebSocket();
    return this.subject;
  }

  public close() {
    this.ws?.close();
  }

  public createWebSocket(): AnonymousSubject<MessageEvent> {
    this.ws = new WebSocket(this.baseUrl);

    const observable = new Observable((obs: Observer<MessageEvent<Message>>) => {
      this.ws.onopen = () => {
        console.log("ws connection successfully opened - sending auth");
        const token = this.authService.getToken();
        if (token) {
          const message: Message = {
            content: "",
            recipient: "",
            sender: this.authService.getUsername(),
            type: "AUTH",
            info: [],
            token: token
          };
          console.log("sending message", message);
          this.messages?.next(message);
        } else {
          console.log("ws - auth - no token");
        }


      };
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    });

    const observer = {
      error: (err: unknown) => {
        console.log("obs error");
        console.error(err);
      },
      complete: () => {
        console.info("compllete ws obs");
      },
      next: (data: MessageEvent<Message>) => {
        console.log("Message sent to websocket: ", data);
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      },
    };

    return new AnonymousSubject<MessageEvent<Message>>(observer, observable);
  }
}
