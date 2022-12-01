import { MdDelete } from "react-icons/md";
import { deleteDonator } from "../../../../api/list";
import { useList } from "../../../../hooks/useList";

export function RemoveDonatorButton({ itemId }: { itemId: string }) {
  const { list } = useList();

  function handleRemoveDonator(listId: string) {
    deleteDonator(listId, itemId);
    window.location.reload();
  };

  return (
    <button
      disabled={!itemId}
      className="btn btn-sm btn-danger"
      onClick={() => handleRemoveDonator(list.id || "")}
    >
      <MdDelete />
    </button>
  );
};