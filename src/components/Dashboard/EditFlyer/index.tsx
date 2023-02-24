import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListApi } from "../../../api/listApi";

export const EditFlyer = () => {
  const [manager, setManager] = useState("");
  const [text, setText] = useState("");
  const path = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

  useEffect(() => {
    ListApi.getList(path)
      .then((res) => {
        setManager(res.data.manager);
        setText(res.data.text);
      })
      .catch((err) => console.log(err.response.data));
  }, [path])

  const handleChangeManager = (event: any) => setManager(event.target.value);
  const handleChangeText = (event: any) => setText(event.target.value);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!manager) {
      return alert("Insira um responsável para o panfleto");
    }
    if (!text) {
      return alert("Insira um texto para o panfleto");
    }

    const updateListRequest: { manager?: string, text?: string } = {};
    if (manager !== "") {
      updateListRequest.manager = manager;
    }
    if (text !== "") {
      updateListRequest.text = text;
    }

    ListApi.updateList(path, updateListRequest)
      .then(() => navigate(`/dashboard/flyers/${path}`))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="text-bg-secondary vh-auto">
      <h1 className="py-3 ps-3 text-bg-light">Editar panfleto</h1>
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="manager">Nome do responsável:</label>
          <input
            className="form-control"
            type="text"
            name="manager"
            id="manager"
            value={manager}
            onChange={handleChangeManager}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Texto de apresentação:</label>
          <textarea
            className="form-control mb-1"
            name="text"
            id="text"
            value={text}
            onChange={handleChangeText}
            cols={30}
            rows={20}
          />
        </div>
        <div className="mt-2">
          <button type="submit" className="w-100 btn btn-primary">Enviar alterações</button>
          <Link to={`/dashboard/flyers/${path}`} className="w-100 mt-2 btn btn-danger">Cancelar</Link>
        </div>
      </form >
    </div>
  )
};