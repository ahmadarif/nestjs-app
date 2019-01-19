import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server;
  
  handleConnection(client: SocketIO.Socket) {
    console.log('new connection from', client.id);
  }

  handleDisconnect(client: SocketIO.Socket) {
    console.log('client', client.id, 'disconnected');
  }

  @SubscribeMessage('events')
  onEvents(client: SocketIO.Socket, data: any) {
    console.log(data);
    client.emit('events', 1000);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async onIdentity(client: SocketIO.Socket, data: number): Promise<number> {
    return data + 1;
  }
}