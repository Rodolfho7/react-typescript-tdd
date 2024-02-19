import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApiContext, { ApiContextProps } from "../contexts/api/api-context";

export function useLogout() {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext) as ApiContextProps;
  return () => {
    setCurrentAccount(null);
    navigate('/login', { replace: true });
  }
}
