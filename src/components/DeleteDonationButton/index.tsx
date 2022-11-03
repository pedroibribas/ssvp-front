import { MdDelete } from "react-icons/md";
import { useList } from "../../hooks/useList";
import { deleteDonation } from "../../api/list";
import S from "./styles.module.scss";

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