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

  @SubscribeMessage('user:username-taken')
  async isUsernameTaken(client: Socket, payload: string) {
    const isTaken = await this.svcUser.isUsernameTaken(payload);
    client.emit("user:username-taken", isTaken)
  }
}
