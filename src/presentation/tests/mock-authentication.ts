import { AccountModel } from "../../domain/models/account-model";
import { Authentication } from "../../domain/usecases/authentication";

export class AuthenticationSpy implements Authentication {
  params!: Authentication.Params;
  account: AccountModel = { accessToken: 'randomwordsaccessToken', name: 'any_name' };
  callsCount = 0;
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
