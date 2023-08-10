import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer, Subject, map } from "rxjs";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { environment } from "src/environments/environment";

export interface Message {
  content: string
  sender: string 
  recipient: string
}

@Injectable({ providedIn: "root" })
export class ChatService {
  private isAdmin = true;
  private baseUrl = this.isAdmin ? environment.apiWebsocketUrlAdmin : environment.apiWebsocketUrlUser;

  private subject?: AnonymousSubject<MessageEvent>;
  public messages?: Subject<Message>;

  constructor(private http: HttpClient) {
    this.messages = <Subject<Message>>this.connect().pipe(
      map((response: MessageEvent): Message => {
        console.log("got repsonse", response.data);
        const data = JSON.parse(response.data);
        return data;
      })
    );
  }

  obs = new Subject<number>();
  i = 1;

  public connect(): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.createWebSocket();
    }
    return this.subject;
  }

  public createWebSocket(): AnonymousSubject<MessageEvent> {
    const ws = new WebSocket(this.baseUrl);

    const observable = new Observable((obs: Observer<MessageEvent<Message>>) => {
      ws.onopen = () => {console.log("ws connection successfully opened");};
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      error: (err: any) => {
        console.log("obs error")
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
