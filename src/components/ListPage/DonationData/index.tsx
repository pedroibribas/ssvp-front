import { DeleteDonationButton } from "./DeleteDonationButton";
import { RemoveDonatorButton } from "./RemoveDonatorButton";

interface Item {
  id: string;
  title: string;
  donator: string;
}

interface DonationDataProps {
  item: Item;
  index: number;
}

export function DonationData({ item, index }: DonationDataProps) {
  return (
    <table className="table table-info">
      <thead>
        <tr className="table-active">
          <th scope="col" colSpan={2} className="text-center">
            Doação {index + 1}
          </th>
          <th scope="col" colSpan={1} className="text-center">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr className="lh-lg">
          <th scope="row">Item</th>
          <td>{item.title}</td>
          <td className="text-center"><DeleteDonationButton itemId={item.id} /></td>
        </tr>
        <tr>
          <th scope="row">Doador</th>
          {item.donator ? (
            <>
              <td>{item.donator}</td>
              <td className="text-center"><RemoveDonatorButton itemId={item.id} /></td>
            </>
          ) : (
            <>
              <td className="text-muted">Nenhum</td>
              <td className="text-center"><RemoveDonatorButton itemId="" /></td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
};