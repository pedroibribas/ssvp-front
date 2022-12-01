import { FormEvent, useState } from "react";
import { addDonation } from "../../../api/list";
import { useList } from "../../../hooks/useList";

export function AddDonationForm() {
  const { list } = useList();

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
      title
    };

    addDonation(list.id, data)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <form className="form-floating" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        name="title"
        id="title"
        value={title}
        onChange={handleChangeTitle}
      />
      <label htmlFor="form-label">Doação</label>

      <button className='btn btn-sm btn-success mt-1' type="submit">
        Adicionar
      </button>
    </form >
  )
};