import io from "socket.io-client";

export class SocketService {
  readonly #socket = io("http://localhost:3005", {
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
    this.#socket.emit("ping", ['world']);
  }
}
