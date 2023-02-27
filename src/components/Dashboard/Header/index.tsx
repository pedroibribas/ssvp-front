import { useAuth } from "../../../contexts/AuthContext";
import { LogoutButton } from "./LogoutButton";

import S from "./styles.module.scss";

export function Header() {
  const Auth = useAuth();
  const username = Auth.user?.username;
  return (
    <header className={S.header}>
      <div className={S.headerContent}>
        <h1>Painel de controle</h1>
        <div>
          <small>Bem-vindo, <span>{username || "erro:nenhum"}</span></small>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};