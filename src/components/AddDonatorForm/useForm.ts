import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addDonator } from "../../api/list";
import { useList } from "../../hooks/useList";
import { getDonationsTitles } from "../../utils/getDonationsTitles";
import { objectsInArraysEqual } from "../../utils/objectsInArraysEqual";

export function useForm() {
	const { donations, getUpdatedListData } = useList();

	const [currentDonations, setCurrentDonations] = useState(donations);
	const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([]);
	const [donator, setDonator] = useState("");

	const path = useLocation().pathname.split("/")[2];

	useEffect(() => {
		setCurrentDonations(donations);

		const newArray = new Array(donations.length);
		setIsCheckedArray(newArray.fill(false));
	}, [donations]);

	const handleChangeCheckbox = (position: number) => {
		const updatedValues =
			isCheckedArray.map((value, index) =>
				index === position ? !value : value
			);
		setIsCheckedArray(updatedValues);
	};

	const handleChangeDonator = (event: React.ChangeEvent<HTMLInputElement>) =>
		setDonator(event.target.value);

	const handleDonationsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const anyCheckedExists = isCheckedArray.find(isChecked => isChecked);

		const updatedDonations = (await getUpdatedListData()).donations;
		const donationsUpdated = objectsInArraysEqual(currentDonations, updatedDonations);

		if (!anyCheckedExists) {
			alert("Escolha uma doação");
			return;
		};

		if (!donationsUpdated) {
			const message = `
				A lista ficou desatualizada.
				Escolha novamente os seus itens para doação.
			`;
			alert(message);

			window.location.reload();
			return;
		};

		if (!donator || donator === "") {
			alert("Insira um nome válido");
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
				const titles = getDonationsTitles(formattedDonations);
				const message = `
					----- ##### ----- #####
					Obrigado pela sua doação!
					Você acabou de escolher os itens: ${titles}.
					##### ------ ##### -----
				`;
				alert(message);

				window.location.reload();
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