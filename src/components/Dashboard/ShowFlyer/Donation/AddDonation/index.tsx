import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { ListApi } from "../../../../../api/Dashboard/listApi";

export function AddDonation({ handleModal }: { handleModal: () => void }) {
  const [title, setTitle] = useState("");
  const path = useLocation().pathname.split("/")[3];

  const handleChangeTitle = (event: any) => setTitle(event.target.value);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      return alert("Insira uma doação");
    };

    ListApi.addDonation(path, { title })
      .then(() => window.location.reload())
      .catch((err) => console.log(err.response.data));
  };

  return (
    <form className="form-floating" onSubmit={handleSubmit}>
      <input type="text" className="form-control" name="title" id="title" value={title} onChange={handleChangeTitle} />
      <label htmlFor="form-label">Doação</label>
      <div className="mt-1">
        <button className='btn btn-sm btn-success' type="submit">Adicionar</button>
        <button type="button" className='btn btn-sm btn-secondary ms-1' onClick={handleModal}>Cancelar</button>
      </div>
    </form >
  )
};