import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiContext, { ApiContextProps } from "../../contexts/api/api-context";

type PrivateRouteProps = {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const { getCurrentAccount } = useContext(apiContext) as ApiContextProps;
  const accessToken = getCurrentAccount ? getCurrentAccount()?.accessToken : null;
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  })
  return children;
}
