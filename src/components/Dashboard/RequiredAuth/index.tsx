import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

interface RequiredAuthProps {
  children: React.ReactElement
}
export const RequiredAuth = (props: RequiredAuthProps) => {
  const Auth = useAuth();
  const hasAuth = Auth.hasAuth();
  const location = useLocation();

  return hasAuth
    ? props.children
    : <Navigate to="/dashboard/login" replace state={location.pathname} />
}