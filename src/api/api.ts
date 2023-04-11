import http from '../services/httpService';

class API {
  private uri: string;

  constructor(uri: string) {
    this.uri = `${uri}`;
  }

  list = async (query?: unknown) =>
    await http.get(this.uri, {
      params: query,
    });
}

export default API;
