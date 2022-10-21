import { FormEvent, useState } from "react";
import { addDonation } from "../../api/list";
import { useList } from "../../hooks/useList";
import S from "./styles.module.scss";

export function AddDonationForm() {
  const list = useList();

  const [title, setTitle] = useState("");

  function handleChangeTitle(event: any) {
    setTitle(event.target.value);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title || title === "") {
      alert("Insira uma doação");
      return;
    };

    const data = {
      title,
    };

    if (!list) {
      return;
    };

    addDonation(list.id, data)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <form className={S.container} onSubmit={handleSubmit}>
      <div className={S.field}>
        <label htmlFor="manager">
          Doação:
        </label>
        <input
          type="text"
          name="manager"
          id="manager"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <button className={S.button} type="submit">
        Adicionar
      </button>
    </form >
  )
};