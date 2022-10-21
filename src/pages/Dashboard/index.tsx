import { useState } from "react";
import { CreateListForm, Footer, Header, ListsDisplay } from "../../components";
import S from "./styles.module.scss";

export function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleClick() {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};