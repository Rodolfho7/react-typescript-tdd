import { GetStorage } from "../../../data/protocols/cache/get-storage";
import { HttpGetClient, HttpGetParams } from "../../../data/protocols/http/http-get-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) { }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    if (account?.accessToken) {
      params.headers = {
        ...params.headers,
        'x-access-token': account.accessToken
      }
    }
    const httpResponse = await this.httpGetClient.get(params);
    return httpResponse;
  }
}
