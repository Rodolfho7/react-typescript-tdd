import { mockAccountModel } from "../../domain/tests/mock-account"
import { LocalStorageAdapter } from "../../infra/cache/local-storage-adapter";
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from "./current-account-adapter";

jest.mock('../../infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  afterAll(() => localStorage.clear());

  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  })

  test('Should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel();
    localStorage.setItem('account', JSON.stringify(account));
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, "get").mockReturnValue(account);
    const accountResponse = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(accountResponse).toEqual(account);
  })
})
