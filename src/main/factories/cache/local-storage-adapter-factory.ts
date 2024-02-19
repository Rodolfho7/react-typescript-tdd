import { LocalStorageAdapter } from "../../../infra/cache/local-storage-adapter";

export function makeLocalStorageAdapter() {
  return new LocalStorageAdapter();
}
