import { deleteDonator } from "../../api/list";
import { useList } from "../../hooks/useList";
import { MdRemoveCircleOutline } from "react-icons/md";
import S from "./styles.module.scss";

export function RemoveDonatorButton({ itemId }: { itemId: string }) {
  const { list } = useList();

  function handleRemoveDonator(listId: string) {
    deleteDonator(listId, itemId);
    window.location.reload();
  };

  return (
    <button
      className={S.button}
      onClick={() => handleRemoveDonator(list.id || "")}
    >
      <MdRemoveCircleOutline />
    </button>
  );
};