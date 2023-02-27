import { useAuth } from "../../../../contexts/AuthContext";

export const LogoutButton = () => {
  const Auth = useAuth();
  function handleLogout() {
    Auth.logout();
    window.location.reload();
  }
  return <button onClick={handleLogout}>Sair</button>;
}