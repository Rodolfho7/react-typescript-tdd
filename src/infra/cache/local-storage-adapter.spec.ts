import { LocalStorageAdapter } from "./local-storage-adapter";

describe('LocalStorageAdapter', () => {
  test('Should call localStorage.setItem with correct values', () => {
    const sut = new LocalStorageAdapter();
    const key = 'any_key';
    const value = {'key': 'any_value'};
    sut.set(key, value);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  })

  test('Should call localStorage.removeItem if there is not a value', () => {
    const sut = new LocalStorageAdapter();
    const key = 'any_key';
    sut.set(key, null);
    expect(localStorage.getItem(key)).toBeNull();
  })

  test('Should call localStorage.getItem with correct value', () => {
    const sut = new LocalStorageAdapter();
    const key = 'any_key';
    localStorage.clear();
    const value = {'key': 'any_value'};
    localStorage.setItem(key, JSON.stringify(value));
    const itemObj = sut.get(key);
    expect(itemObj).toEqual(value);
  })
})
