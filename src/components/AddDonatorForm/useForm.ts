import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addDonator } from "../../api/list";
import { useList } from "../../hooks/useList";
import { objectsInArraysEqual } from "../../utils/objectsInArraysEqual";

export function useForm() {
  const { donations, getUpdatedListData } = useList();

  const [currentDonations, setCurrentDonations] = useState(donations);

  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([]);

  const [donator, setDonator] = useState("");

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    setCurrentDonations(donations);
    setIsCheckedArray(new Array(donations.length).fill(false));
  }, [donations]);

  function handleChangeCheckbox(position: number) {
    const newIsCheckedArray = isCheckedArray.map((box, index) =>
      index === position ? !box : box
    );

    setIsCheckedArray(newIsCheckedArray);
  };

  function handleChangeDonator(event: React.ChangeEvent<HTMLInputElement>) {
    setDonator(event.target.value);
  };

  async function handleDonationsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedDonations = (await getUpdatedListData()).donations;

    const isListUpdated = objectsInArraysEqual(currentDonations, updatedDonations);

    if (!isListUpdated) {
      window.location.reload();
      alert("A lista ficou desatualizada. Escolha novamente os seus itens para doação.");
      return;
    };

    if (!donator || donator === "") {
      alert("Insira um nome válido");
      return;
    };

    const anyCheckedExists = isCheckedArray.find(isChecked => isChecked);

    if (!anyCheckedExists) {
      alert("Escolha uma doação");
      return;
    };

    const formattedDonations = currentDonations.map((donation, index) => ({
      id: donation.id,
      title: donation.title,
      isChecked: isCheckedArray[index],
    }));

    const donationsData = {
      name: donator,
      donations: formattedDonations
    };

    addDonator(path, donationsData)
      .then(() => {
        function getCheckedDonationsTitles() {
          const checkedDonations = formattedDonations.filter(
            donation => donation.isChecked === true
          );

          const titles = checkedDonations
            .map(donation => donation.title)
            .join(', ');

          return titles
        };

        const checkedTitles = getCheckedDonationsTitles();
        window.location.reload();
        alert(`Você acabou de escolher os itens: ${checkedTitles}. Obrigado pela sua doação!`);
      })
      .catch((err) => console.log(err));
  };

  return {
    currentDonations,
    isCheckedArray,
    donator,
    handleChangeCheckbox,
    handleChangeDonator,
    handleDonationsSubmit
  };
};