import { InvalidCredentialsError } from "../../../domain/error/invalid-credentials-error";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { Authentication } from "../../../domain/usecases/authentication";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemoteAuthentication implements Authentication {
  constructor(
    private url: string,
    private httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) { }

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (!httpResponse.body) {
          throw new UnexpectedError();
        }
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
