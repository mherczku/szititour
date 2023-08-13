import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer, Subject, map } from "rxjs";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { environment } from "src/environments/environment";
import { AuthService } from "./AuthService";

export interface Message {
  content: string
  sender: string 
  recipient: string
  type: "MSG" | "INFO" | "AUTH"
  info: string[]
  token: string
}

@Injectable({ providedIn: "root" })
export class ChatService {
  private baseUrl = "";

  private subject?: AnonymousSubject<MessageEvent>;
  public messages?: Subject<Message>;

  constructor(private http: HttpClient, private authService: AuthService) {
  
  }

  obs = new Subject<number>();

  public initializeChat(isAdmin: boolean) {
    this.baseUrl = isAdmin ? environment.apiWebsocketUrlAdmin : environment.apiWebsocketUrlUser;

    this.messages = <Subject<Message>>this.connect().pipe(
      map((response: MessageEvent): Message => {
        console.log("got repsonse", response.data);
        const data = JSON.parse(response.data);
        return data;
      })
    );
  }

  private connect(): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.createWebSocket();
    }
    return this.subject;
  }

  public createWebSocket(): AnonymousSubject<MessageEvent> {
    const ws = new WebSocket(this.baseUrl);

    const observable = new Observable((obs: Observer<MessageEvent<Message>>) => {
      ws.onopen = () => {
        console.log("ws connection successfully opened - sending auth");
        const token = this.authService.getToken();
        if(token) {
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
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      error: (err: any) => {
        console.log("obs error");
        console.error(err);
      },
      complete: () => {
        console.info("compllete ws obs");
      },
      next: (data: MessageEvent<Message>) => {
        console.log("Message sent to websocket: ", data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    return new AnonymousSubject<MessageEvent<Message>>(observer, observable);
  }
}
