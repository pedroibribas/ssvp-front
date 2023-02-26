import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardReturn as ReturnIcon } from "react-icons/md";
import { ListApi } from "../../../api/Dashboard/listApi";
import { DeleteFlyer } from "../DeleteFlyer";
import { AddDonation } from "./Donation/AddDonation";
import { ShowDonation } from "./Donation/ShowDonation";

interface Donation {
  _id: string
  title: string
  donator?: string
}

interface ShowFlyerResponse {
  _id: string
  manager: string
  text: string
  items?: Donation[]
}

export function ShowFlyer() {
  const [flyer, setFlyer] = useState<ShowFlyerResponse>({} as ShowFlyerResponse);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isOpenDeleteFlyerModal, setIsOpenDeleteFlyerModal] = useState(false);

  const path = useLocation().pathname.split("/")[3];

  useEffect(() => {
    ListApi.getList(path)
      .then((res) => setFlyer(res.data))
      .catch((err) => console.log(err));
  }, [path])

  const handleOpenAddDonationForm = () => setIsFormOpen(!isFormOpen);
  const handleOpenDeleteFlyerModal = () => setIsOpenDeleteFlyerModal(!isOpenDeleteFlyerModal);

  if (!flyer) {
    return (
      <div className="text-center vh-100 mt-5">
        <div className="spinner-border spinner-border-sm" />
        <small className="ms-1">Carregando lista...</small>
      </div>
    );
  }

  return (
    <>
      <main className="container">
        <h1 className="pt-4">Painel de alterações</h1>
        <Link className="d-block text-center link-dark py-4" to="/dashboard/flyers">
          Voltar <ReturnIcon className="d-block mx-auto" />
        </Link>
        <h2>Dados do panfleto</h2>
        <div><strong>Responsável:</strong> {flyer?.manager}</div>
        <hr />

        <Link to={`/landingpage/${flyer._id}`} target="_blank" className="btn btn-warning">Ver panfleto</Link>
        <hr />

        <div>
          <h3>Doações</h3>
          {flyer.items?.map((donation) => <ShowDonation key={donation._id} donation={donation} />)}
          <button className="btn btn-primary" onClick={handleOpenAddDonationForm}>Adicionar doação</button>
          {isFormOpen && <div className="mt-3 p-3 bg-dark rounded"><AddDonation handleModal={handleOpenAddDonationForm} /></div>}
        </div>
        <hr />

        <div>
          <h3>Texto de apresentação</h3>
          <p className="p-3 bg-light font-monospace text-start lh-lg" style={{ "whiteSpace": "break-spaces" }}>{flyer.text}</p>
        </div>
        <hr />

        <div className="py-5 text-center ">
          <Link className="btn btn-primary" to={`/dashboard/flyers/${path}/edit`}>Alterar</Link>
          <button className="btn btn-danger ms-2" onClick={handleOpenDeleteFlyerModal}>Excluir</button>
        </div>
        <hr />

        <div className="py-4 text-center ">
          <Link className="link-dark" to="/dashboard/flyers">
            Voltar para listas
            <ReturnIcon className="d-block mx-auto" />
          </Link>
        </div>
      </main>
      {isOpenDeleteFlyerModal && <DeleteFlyer handleModal={handleOpenDeleteFlyerModal} />}
    </>
  );
};