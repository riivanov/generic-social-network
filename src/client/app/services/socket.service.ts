import { ServerClientEvents } from "@lib/socket/event-names";
import io from "socket.io-client";

export class SocketService {
  public readonly socket = io("http://localhost:3005", {
    withCredentials: true,
  });

  static #instance: SocketService;
  private constructor() {}

  public static get instance(): SocketService {
    if (!SocketService.#instance) {
      SocketService.#instance = new SocketService();
    }

    return SocketService.#instance;
  }

  async sendPing() {
    this.socket.emit("ping", ["world"]);
  }

  isUsernameTaken(username: string) {
    return this.socket.emit<ServerClientEvents>(
      "user:is-username-taken",
      username
    );
  }

  isEmailTaken(email: string) {}
}
