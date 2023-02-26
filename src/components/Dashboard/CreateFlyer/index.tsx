import { FormEvent, useState } from "react";
import { MdClose, MdOutlinePlusOne } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ListApi } from "../../../api/Dashboard/listApi";

export const CreateFlyer = () => {
  const [manager, setManager] = useState("");
  const [text, setText] = useState("");
  const [donations, setDonations] = useState([""]);

  const navigate = useNavigate();

  const handleChangeManager = (event: any) => setManager(event.target.value);

  const handleChangeText = (event: any) => setText(event.target.value);

  const handleChangeDonation = (position: number, event: any) => {
    const updatedDonation = donations.map((donation, index) => index === position ? event.target.value : donation);
    setDonations(updatedDonation);
  }

  const handleAddDonationField = () => {
    setDonations((prevState) => [...prevState, ""]);
  }

  const handleRemoveDonationField = (position: number) => {
    const filteredDonations = donations.filter((donation, index) => index !== position);
    setDonations(filteredDonations);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!manager) {
      return alert("Insira um nome para o responsável");
    }
    if (!text) {
      return alert("Insira um texto para o panfleto");
    }
    if (donations.includes("")) {
      return alert("Existem campos vazio");
    }

    const items = donations.map((donation) => ({ title: donation }));
    ListApi.createList({ manager, text, items })
      .then(() => navigate("/dashboard/flyers"))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="text-bg-secondary vh-auto">
      <h1 className="py-3 ps-3 text-bg-light">Criar panfleto</h1>
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
        <div>
          Lista de doações:
          {donations.map((donation, index) => (
            <div key={index} className="input-group mt-1 align-items-center">
              <label className="input-group-text" htmlFor={`custom-checkbox-${index}`}>Item {index + 1}</label>
              <input
                className="form-control"
                type="text"
                id={`custom-checkbox-${index}`}
                name={index.toString()}
                value={donation}
                onChange={(event) => handleChangeDonation(index, event)}
              />
              {index > 0 && (
                <button type="button" className="input-group-text btn btn-danger" onClick={() => handleRemoveDonationField(index)}>
                  <MdClose />
                </button>
              )}
            </div>
          ))}
          <button type="button" className="mt-1 btn btn-sm btn-warning" onClick={handleAddDonationField}>
            <MdOutlinePlusOne className="fs-5 d-block" />
          </button>
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
          <button type="submit" className="w-100 btn btn-primary">Criar</button>
          <Link to="/dashboard/flyers" className="w-100 mt-2 btn btn-danger">Cancelar</Link>
        </div>
      </form >
    </div>
  )
};