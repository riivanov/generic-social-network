import { AuthenticatedUser, IUser } from "@lib/models/user.interface";

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
    const res = await fetch(`${url}/api/v1/user`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(response => response.json()) as IUser;

    return res;
  }

  async login(user: IUser): Promise<Partial<AuthenticatedUser> | null> {
    const res = await fetch(`${url}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    if (res.status > 200 && res.status < 300) {
      return res.json()
    }
    else return null;

  }
}
