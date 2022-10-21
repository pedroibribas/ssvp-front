import { FormEvent, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { createList } from "../../api/list";
import S from "./styles.module.scss";

export function CreateListForm() {
  const [manager, setManager] = useState("");

  const [titles, setTitles] = useState<string[]>([""]);

  function handleAddItemClick() {
    setTitles(prevState => ([
      ...prevState, ""
    ]));
  };

  function handleRemoveItemClick(position: number) {
    const filtered = titles.filter((title, index) => index !== position);
    setTitles(filtered);
  };

  function handleChangeManager(event: any) {
    setManager(event.target.value);
  };

  function handleChangeTitle(position: number, event: any) {
    const updatedTitles = titles.map((title, index) =>
      index === position ? event.target.value : title
    );
    setTitles(updatedTitles);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!manager || manager === "") {
      alert("Insira um nome para o responsável");
      return;
    };


    const items = titles.map(title => ({
      title: title
    }));

    const hasEmptyFields = items.find(({ title }) => title === "");

    if (hasEmptyFields) {
      alert("Existem campos vazio");
      return;
    };

    const data = {
      manager,
      items
    };

    createList(data)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <form className={S.container} onSubmit={handleSubmit}>
      <div className={S.field}>
        <label htmlFor="manager">
          Nome do responsável:
        </label>
        <input
          type="text"
          name="manager"
          id="manager"
          value={manager}
          onChange={handleChangeManager}
        />
      </div>

      {titles.map((title, index) => (
        <div key={index} className={S.field}>
          <label htmlFor={`custom-checkbox-${index}`}>
            Item {index + 1}:
          </label>
          <input
            type="text"
            id={`custom-checkbox-${index}`}
            name={index.toString()}
            value={title}
            onChange={(event) => handleChangeTitle(index, event)}
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveItemClick(index)}
            >
              Remover
            </button>
          )}
        </div>
      ))}

      <button type="button" className={S.btn} onClick={handleAddItemClick}>
        <MdAddBox />
      </button>

      <button type="submit" className={S.submit}>
        Enviar
      </button>
    </form >
  )
};