import { useState } from "react";
import { Link } from "react-router-dom";
import { AddDonationForm } from "../../components/AddDonationForm";
import { DeleteListButton } from "../../components/DeleteListButton";
import { ListDisplay } from "../../components/ListDisplay";
import { useList } from "../../hooks/useList";
import S from "./styles.module.scss";

export function List() {
  const list = useList();

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
          <h2>Lista de {list?.manager || "carregando..."}</h2>
        </section>
        <div className={S.divider} />
        <section>
          <h3>Opções</h3>
          <Link to={`/flyer/${list?.id}`} target="_blank">
            Ver panfleto
          </Link>
          <button onClick={handleClick}>Adicionar doação</button>
          <DeleteListButton />
          {isFormOpen && <AddDonationForm />}
        </section>
        <div className={S.divider} />
        <section>
          <ListDisplay />
        </section>
        <div className={S.divider} />
        <section>
          <Link to="/dashboard">
            Voltar ao painel
          </Link>
        </section>
      </main>
      <footer className={S.footer}>
        <small>SSVP @2022</small>
      </footer>
    </>
  );
};