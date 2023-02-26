import { useLocation, useNavigate } from "react-router-dom";
import { ListApi } from "../../../api/Dashboard/listApi";

interface DeleteFlyerProps {
  handleModal: () => void
}

export function DeleteFlyer({ handleModal }: DeleteFlyerProps) {
  const path = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const handleDelete = () => {
    ListApi.deleteList(path);
    navigate("/dashboard/flyers");
  }
  return (
    <div className="position-fixed top-0 start-0 vw-100 vh-100 bg-dark bg-opacity-25" style={{ "zIndex": 100 }}>
      <div className="position-relative top-50 start-50 translate-middle w-75 p-3 bg-opacity-100 bg-light rounded shadow">
        <div className="mb-3">
          <div>Confirmar exclusão do panfleto?</div>
          <small className="text-warning bg-dark ">A exclusão do panfleto não poderá ser desfeita</small>
        </div>
        <div className="text-center">
          <button className="btn btn-sm btn-danger me-2" onClick={handleDelete}>Confirmar</button>
          <button className="btn btn-sm btn-secondary" onClick={handleModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};