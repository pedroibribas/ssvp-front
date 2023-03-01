import { useEffect, useState } from "react";
import { BsFillPersonCheckFill as CheckSvg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ListApi } from "../../../api/Dashboard/listApi";
import { Loader } from "../Loader";

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
  const [isLoading, setIsLoading] = useState(true);
  const flyersExist = flyers.length > 0;

  const navigate = useNavigate();

  useEffect(() => {
    ListApi.getLists()
      .then((res) => {
        setIsLoading(false);
        setFlyers(res.data.data);
      })
      .catch((err) => {
        if (!err.response && err.code === "ERR_NETWORK") {
          return navigate("/dashboard/errors/errNetwork");
        }
        console.error(`ShowFlyers:30 - ${err.response.data}`);
      });
  }, [navigate]);

  if (isLoading && flyers.length === 0) {
    return <Loader />;
  }

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
              <li key={donation._id} className="d-flex justify-content-between list-group-item">
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
        <>Nenhum panfleto encontrado para o usuário.</>
      )}
    </div>
  )
};