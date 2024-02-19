import { AccountModel } from "../../domain/models/account-model";
import { AddAccount } from "../../domain/usecases/add-account";

export class AddAccountSpy implements AddAccount {
  params!: AddAccount.Params;
  account: AccountModel = { accessToken: 'randomwordsaccessToken', name: 'any_name' };
  callsCount = 0;
  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
