import { useEffect, useState } from "react";
import { BsFillPersonCheckFill as CheckSvg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ListApi } from "../../../api/Dashboard/listApi";

interface Donation {
  _id: string
  title: string
  donator?: string
}

interface List {
  _id: string
  manager: string
  text: string
  items?: Donation[]
}

export const ShowFlyers = () => {
  const [flyers, setFlyers] = useState<List[]>([]);
  const flyersExist = flyers.length > 0;
  useEffect(() => {
    ListApi.getLists().then((res) => setFlyers(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="mb-5">
      {flyersExist ? flyers.map((flyer, index) => (
        <article key={flyer._id} className="card text-bg-light mt-5">
          <div className="card-header">
            <div className="card-title">Panfleto {index + 1}</div>
            <div className="card-text"><strong>Responsável:</strong> {flyer.manager}</div>
          </div>
          <ul className="list-group list-group-flush">
            {flyer?.items?.map(donation => (
              <li key={donation._id} className="list-group-item">
                {donation.title}&nbsp;
                {donation.donator && <span className="badge rounded-pill text-bg-success"><CheckSvg /></span>}
              </li>
            ))}
          </ul>
          <div className="card-body">
            <Link to={`/dashboard/flyers/${flyer._id}`} className="card-link">Ver detalhes/Editar</Link>
            <Link to={`/landingpage/${flyer._id}`} target="_blank" className="card-link">Acessar página</Link>
          </div>
        </article>
      )) : (
        <>Nenhum panfleto encontrado.</>
      )}
    </div>
  )
};