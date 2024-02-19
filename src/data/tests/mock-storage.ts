import { SetStorage } from "../protocols/cache/set-storage";

export class SetStorageMock implements SetStorage {
  key: string | undefined;
  value: object | undefined;

  set(key: string, value: object): void {
    this.key = key;
    this.value = value;
  }
}
