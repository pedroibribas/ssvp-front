import { useNavigate } from "react-router-dom";
import { deleteList } from "../../api/list";
import { useList } from "../../hooks/useList";
import S from "./styles.module.scss";

export function DeleteListButton() {
  const list = useList();

  const navigate = useNavigate();

  function handleClick() {
    if (list) {
      deleteList(list.id);
      navigate("/dashboard");
    }
  };

  return (
    <button
      className={S.deleteListbutton}
      onClick={handleClick}
    >
      Excluir lista
    </button>
  );
};