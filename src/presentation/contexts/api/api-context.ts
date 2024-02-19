import { createContext } from "react";
import { AccountModel } from "../../../domain/models/account-model";

export type ApiContextProps = {
  setCurrentAccount: (account: AccountModel | null) => void,
  getCurrentAccount?: () => AccountModel | null
}

export default createContext<ApiContextProps | undefined>(undefined);
