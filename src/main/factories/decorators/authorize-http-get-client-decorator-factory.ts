import { HttpGetClient } from "../../../data/protocols/http/http-get-client";
import { AuthorizeHttpGetClientDecorator } from "../../decorators/authorize-http-get-client/authorize-http-get-client-decorator";
import { makeLocalStorageAdapter } from "../cache/local-storage-adapter-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export function makeAuthorizeHttpGetClientDecorator(): HttpGetClient {
  const getStorage = makeLocalStorageAdapter();
  const httpClient = makeAxiosHttpClient();
  return new AuthorizeHttpGetClientDecorator(getStorage, httpClient);
}
