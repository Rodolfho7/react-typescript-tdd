import { AccessDeniedError } from "../../domain/error/access-denied-error";
import { useLogout } from "./use-logout";

export function useErrorHandler(callback: (error: Error) => void) {
  const logout = useLogout();
  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      logout();
    } else {
      callback(error);
    }
  }
}
