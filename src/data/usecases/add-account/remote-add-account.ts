import { EmailInUseError } from "../../../domain/error/email-in-use-error";
import { UnexpectedError } from "../../../domain/error/unexpected-error";
import { AddAccount } from "../../../domain/usecases/add-account";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private httpPostClient: HttpPostClient<RemoteAddAccount.Model>
  ){}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const response = await this.httpPostClient.post({ url: this.url, body: params });
    switch(response.statusCode) {
      case HttpStatusCode.ok:
        if (!response.body) throw new UnexpectedError();
        return response.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
