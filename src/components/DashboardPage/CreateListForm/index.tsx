import { FormEvent, useState } from "react";
import { MdClose, MdOutlinePlusOne } from "react-icons/md";
import { createList } from "../../../api/list";

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
    <form className="form-floating" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        name="manager"
        id="manager"
        value={manager}
        onChange={handleChangeManager}
      />
      <label htmlFor="manager">
        Nome do responsável
      </label>

      {titles.map((title, index) => (
        <div
          key={index}
          className="input-group mt-1 align-items-center"
        >
          <label
            className="input-group-text"
            htmlFor={`custom-checkbox-${index}`}
          >
            Item {index + 1}
          </label>
          <input
            className="form-control"
            type="text"
            id={`custom-checkbox-${index}`}
            name={index.toString()}
            value={title}
            onChange={(event) => handleChangeTitle(index, event)}
          />
          {index > 0 && (
            <button
              type="button"
              className="input-group-text btn btn-danger"
              onClick={() => handleRemoveItemClick(index)}
            >
              <MdClose />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="mt-1 btn btn-sm btn-warning"
        onClick={handleAddItemClick}
      >
        <MdOutlinePlusOne className="fs-5 d-block" />
      </button>

      <button type="submit" className="d-block mx-auto btn btn-dark">
        Criar
      </button>
    </form >
  )
};