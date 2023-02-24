import { useAuth } from "../../../contexts/AuthContext";
import { LogoutButton } from "./LogoutButton";

import S from "./styles.module.scss";

export function Header() {
  const { user } = useAuth();

  const username = user.username || null;

  return (
    <header className={S.header}>
      <div className={S.headerContent}>
        <h1>Painel de controle</h1>
        <div>
          <small>Bem-vindo, <span>{username}</span></small>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};