import { Injectable } from '@angular/core';
import { Api } from './api';
import { PixelDto } from './PixelInterfaces';
import { CanvasAction, MessageType, WebSocketMessage } from './room';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomApi extends Api {
  private wsUrl  = "ws://10.234.197.18:5294/api/room";
  private _pixelSubject = new Subject<CanvasAction>();
  private socket!: WebSocket;

  public pixelsObservable: Observable<CanvasAction> = this._pixelSubject.asObservable();

  public connect = (roomId: string) => {
    const token = sessionStorage.getItem('token');

    if (!token)
      return;

    this.socket = new WebSocket(`${this.wsUrl}/${roomId}?token=${encodeURIComponent(token)}`);

    this.socket.onopen = (event) => {
      console.log("Conexão estabelecida.");
    }

    this.socket.onmessage = (event: MessageEvent) => {
      const message: WebSocketMessage<any> = JSON.parse(event.data);

      switch (message.Type) {
        case MessageType.Message:
          console.log(message.Data);
          break;
        case MessageType.FirstConnection:
          this._pixelSubject.next({type: 'FULL_LOAD', payload: message.Data});
          break;
        case MessageType.PlayerAction:
          this._pixelSubject.next({type: 'SINGLE_LOAD', payload: message.Data});
          break;
        default:
          break;
      }
    }

    this.socket.onerror = (err) => {
      console.error("Erro ao conectar no socket: ", err);
    }

    this.socket.onclose = () => {
      console.log("Conexão encerrada.")
    }
  }

  public closeConnection = () => {
    if (this.socket) {
      this.socket.close();
    }
  }
  
  public updatePixel = (data: PixelDto) => {
    if (this.socket.readyState === WebSocket.OPEN){
      this.socket.send( JSON.stringify(data) );
    } else {
      console.log("Falha ao enviar dados do pixel.");
    }
  }
}
