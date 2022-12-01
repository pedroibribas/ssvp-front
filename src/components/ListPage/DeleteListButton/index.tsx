import { useNavigate } from "react-router-dom";
import { deleteList } from "../../../api/list";
import { useList } from "../../../hooks/useList";

export function DeleteListButton() {
  const { list } = useList();

  const navigate = useNavigate();

  function handleClick() {
    deleteList(list.id);
    navigate("/dashboard");
  };

  return (
    <button
      className="btn btn-danger"
      onClick={handleClick}
    >
      Excluir lista
    </button>
  );
};