import { useState } from "react";
import { CreateListForm } from "../../components/CreateListForm";
import { ListsDisplay } from "../../components/ListsDisplay";
import S from "./styles.module.scss";

export function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleClick() {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <header className={S.header}>
        <div className={S.headerContent}>
          <h1>Painel de controle</h1>
          <small>Logado como administrador</small>
        </div>
      </header>
      <main className={S.container}>
        <section>
          <h2>Opções</h2>
          <button type="button" onClick={handleClick}>
            Criar lista
          </button>
          {isFormOpen && <CreateListForm />}
        </section>
        <div className={S.divider} />
        <section>
          <h2>Listas criadas</h2>
          <ListsDisplay />
        </section>
      </main>
      <footer className={S.footer}>
        <small>SSVP @2022</small>
      </footer>
    </>
  );
};