import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLists } from "../../api/list";
import S from "./styles.module.scss";

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
    <div className={S.container}>
      {listsExist ? (
        lists.map((list, index) => (
          <article key={list.id}>
            <h3>Lista {index + 1}</h3>
            <table>
              <caption>
                Lista de <strong>{list.manager}</strong>
              </caption>
              <thead>
                <tr>
                  <th>Doação</th>
                  <th>Doador</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.donator || <span>Nenhum</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={S.links}>
              <Link to={`/list/${list.id}`}>Modificar</Link>
              <Link to={`/flyer/${list.id}`}>Ver panfleto</Link>
            </div>
          </article>
        ))
      ) : (
        <>Nenhuma lista encontrada.</>
      )}
    </div>
  )
};