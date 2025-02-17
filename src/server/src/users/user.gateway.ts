import { ServerClientEvents } from '@lib/socket/event-names';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from './users.service';

@WebSocketGateway(3005, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class UserGateway {
  constructor(private svcUser: UsersService) {}

  @WebSocketServer() io: Server;

  @SubscribeMessage<ServerClientEvents>('user:is-username-taken')
  async isUsernameTaken(client: Socket, payload: string) {
    const isTaken = await this.svcUser.isUsernameTaken(payload);
    client.emit<ServerClientEvents>("user:is-username-taken", isTaken)
  }

  @SubscribeMessage<ServerClientEvents>("user:is-email-taken")
  async isEmailTaken(client: Socket, payload: string) {

  }
}
