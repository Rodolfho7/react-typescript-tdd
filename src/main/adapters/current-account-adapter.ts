import { AccountModel } from "../../domain/models/account-model";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const setCurrentAccountAdapter = (account: AccountModel | null): void => {
  makeLocalStorageAdapter().set('account', account);
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account');
}
