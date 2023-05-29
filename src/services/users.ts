import { makeRequest } from "./fetch.utils";
export default class Users {
  static async getUsers() {
    const URL_ENDPOINT = "https://randomuser.me/api?results=100";

    try {
      const { data, isSuccessful } = await makeRequest({ URL_ENDPOINT });
      if (!isSuccessful) {
        throw new NetworkError();
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}

class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}
