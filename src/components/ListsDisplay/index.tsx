import { Link } from "react-router-dom";
import S from "./styles.module.scss";

export function ListsDisplay() {
  return (
    <div className={S.container}>
      <Link to="/flyer/1">
        <article>
          <h3>Lista 1</h3>
          <table>
            <caption>
              Lista sob responsabilidade de <strong>Mayara Bastos</strong>
            </caption>
            <thead>
              <tr>
                <th>Doação</th>
                <th>Doador</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Item A</td>
                <td>Fulano</td>
              </tr>
              <tr>
                <td>Item B</td>
                <td>Nenhum</td>
              </tr>
            </tbody>
          </table>
        </article>
      </Link>
    </div>
  );
};