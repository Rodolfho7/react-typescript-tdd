import { GetStorage } from "../protocols/cache/get-storage";

export class GetStorageSpy implements GetStorage {
  key: string = '';
  value: any = 'any_value';

  get(key: string): any | null {
    this.key = key;
    return this.value;
  }
}
