import { useLocation } from "react-router-dom";
import { ListApi } from "../../../../../api/listApi";

interface DeleteDonatorProps {
  handleModal: () => void
  donator: string
  donationId: string
}
export const DeleteDonator = (props: DeleteDonatorProps) => {
  const flyerId = useLocation().pathname.split("/")[2];
  const handleDelete = () => {
    const path = { flyerId, donationId: props.donationId };
    const data = { donator: "" };
    ListApi.updateDonation(path, data)
      .then(() => window.location.reload())
      .catch((err) => console.log(err.response.data));
  }
  return (
    <div className="position-fixed top-0 start-0 vw-100 vh-100 bg-dark bg-opacity-25" style={{ "zIndex": 100 }}>
      <div className="position-relative top-50 start-50 translate-middle w-75 p-3 bg-opacity-100 bg-light rounded shadow">
        <div className="text-break mb-2">
          Confirmar exclusão de <strong className="text-uppercase">{props.donator}</strong>?
        </div>
        <div className="text-center">
          <button className="btn btn-sm btn-danger me-2" onClick={handleDelete}>Confirmar</button>
          <button className="btn btn-sm btn-secondary" onClick={props.handleModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};