export class APIService {
  readonly url = "https://swapi.dev/api";

  static #instance: APIService;
  private constructor() {}

  public static get instance(): APIService {
    if (!APIService.#instance) {
      APIService.#instance = new APIService();
    }

    return APIService.#instance;
  }

  async fetchPeople() {
    const res = await fetch(`${this.url}/people`);
    const people = await res.json();
    console.log(people);
  }
}
