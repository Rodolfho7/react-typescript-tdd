import { GetStorage } from "../../data/protocols/cache/get-storage";
import { SetStorage } from "../../data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object | null): void {
    if (!value) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string): any | null {
    const account = localStorage.getItem(key);
    return account ? JSON.parse(account) : null;
  }
}
