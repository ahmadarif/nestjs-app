import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway {
  handleConnection(client: SocketIO.Socket) {
    console.log('new connection from', client.id);
  }

  handleDisconnect(client: SocketIO.Socket) {
    console.log('client', client.id, 'disconnected');
  }

  @SubscribeMessage('events')
  onEvents(client: SocketIO.Socket, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async onIdentity(client: SocketIO.Socket, data: number): Promise<number> {
    return data + 1;
  }
}