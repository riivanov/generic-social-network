import { IUser } from "@lib/models/user.interface";

const url = `http://localhost:3001`;

export class UserService {
  static #instance: UserService;
  private constructor() {}

  public static get instance(): UserService {
    if (!UserService.#instance) {
      UserService.#instance = new UserService();
    }

    return UserService.#instance;
  }

  // TODO
  //
  // CRUD for users
  //

  async createUser(user: IUser) {
    console.log(user);
    const res = await fetch(`${url}/api/v1/user`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(response => response.json()) as IUser;

    console.log(res);
  }
}
