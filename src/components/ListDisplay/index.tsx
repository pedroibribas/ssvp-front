import { useList } from "../../hooks/useList";
import { DeleteDonationButton } from "../DeleteDonationButton";
import { RemoveDonatorButton } from "../RemoveDonatorButton";
import S from "./styles.module.scss";

export function ListDisplay() {
  const { list } = useList();

  return (
    <div className={S.container} key={list.id}>
      <h3>Lista</h3>
      <table>
        <thead>
          <tr>
            <th>Doação</th>
            <th>Doador</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map(item => (
            <tr key={item.id}>
              <td>
                {item.title}
                <DeleteDonationButton itemId={item.id} />
              </td>
              {item.donator ? (
                <td>
                  <span>{item.donator}</span>
                  <RemoveDonatorButton itemId={item.id} />
                </td>
              ) : (
                <td>
                  <span className={S.disabled}>Nenhum</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};