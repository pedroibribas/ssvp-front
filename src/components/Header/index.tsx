import S from "./styles.module.scss";

export function Header() {
  return (
    <header className={S.header}>
      <div className={S.headerContent}>
        <h1>Painel de controle</h1>
        <small>Logado como administrador</small>
      </div>
    </header>
  );
};