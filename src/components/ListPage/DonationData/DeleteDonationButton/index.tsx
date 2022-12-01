import { MdDelete } from "react-icons/md";
import { deleteDonation } from "../../../../api/list";
import { useList } from "../../../../hooks/useList";

export function DeleteDonationButton({ itemId }: { itemId: string }) {
  const { list } = useList();

  function handleDeleteDonation(listId: string) {
    deleteDonation(listId, itemId);
    window.location.reload();
  };

  return (
    <button
      className="btn btn-sm btn-danger"
      onClick={() => handleDeleteDonation(list.id)}
    >
      <MdDelete />
    </button>
  );
};