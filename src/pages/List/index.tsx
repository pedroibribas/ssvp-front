import { useState } from "react";
import { MdKeyboardReturn as ReturnIcon } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  AddDonationForm,
  DeleteListButton,
  Footer,
  Header,
  ListDisplay
} from '../../components';
import { useList } from "../../hooks/useList";
import S from "./styles.module.scss";

export function List() {
  const { list } = useList();

  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleClick() {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <Header />
      <main>
        <section className={S.section}>
          <h2>Lista de {list?.manager || "carregando..."}</h2>
        </section>
        <div className={S.divider} />
        <section className={S.section}>
          <h3>Opções</h3>
          <div className={S.options}>
            <Link to={`/flyer/${list?.id}`} target="_blank">
              Ver panfleto
            </Link>
            <button
              className={S.addDonationButton}
              onClick={handleClick}
            >
              Adicionar doação
            </button>
            <DeleteListButton />
          </div>
          {isFormOpen && <AddDonationForm />}
        </section>
        <div className={S.divider} />
        <section className={S.section}>
          <ListDisplay />
        </section>
        <div className={S.divider} />
        <section className={S.section}>
          <Link className={S.center} to="/dashboard">
            Voltar ao painel
            <ReturnIcon />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};