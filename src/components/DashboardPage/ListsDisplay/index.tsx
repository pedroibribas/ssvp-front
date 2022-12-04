import { useEffect, useState } from "react";
import { BsFillPersonCheckFill as CheckSvg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getLists } from "../../../api/list";

interface List {
  id: string;
  manager: string;
  items: {
    id: string;
    title: string;
    donator: string;
  }[]
};

export function ListsDisplay() {
  const [lists, setLists] = useState<List[]>([]);

  const listsExist = lists.length > 0;

  useEffect(() => {
    getLists()
      .then((res) => setLists(res.data));
  }, []);

  return (
    <div className="mb-5">
      {listsExist ? (
        lists.map((list, index) => (
          <article key={list.id} className="card text-bg-light mt-5">
            <div className="card-header">
              <h3 className="card-title text-center">
                #{index + 1}
              </h3>
              <dl className="card-text mb-0">
                <dt>
                  Responsável
                </dt>
                <dd>
                  {list.manager}
                </dd>
              </dl>
            </div>

            <ul className="list-group list-group-flush">
              {list.items.map(item => (
                <li
                  key={item.id}
                  className="list-group-item"
                >
                  {item.title}&nbsp;
                  {item.donator && (
                    <span className="badge rounded-pill text-bg-success">
                      <CheckSvg />
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="card-body">
              <Link to={`/list/${list.id}`} className="card-link">
                Alterar
              </Link>
              <Link to={`/flyer/${list.id}`} target="_blank" className="card-link">
                Ver panfleto
              </Link>
            </div>
          </article>
        ))
      ) : (
        <>Nenhum panfleto encontrado.</>
      )}
    </div>
  )
};