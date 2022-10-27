import { useList } from "../../hooks/useList";
import { MdDelete } from "react-icons/md";
import S from "./styles.module.scss";
import { deleteDonation } from "../../api/list";

export function DeleteDonationButton({ itemId }: { itemId: string }) {
  const { list } = useList();

  function handleDeleteDonation(listId: string) {
    deleteDonation(listId, itemId);
    window.location.reload();
  };

  return (
    <button
      className={S.button}
      onClick={() => handleDeleteDonation(list.id)}
    >
      <MdDelete />
    </button>
  );
};