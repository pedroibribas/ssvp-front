import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ListApi } from "../../../api/listApi";
import { objectsInArraysEqual } from "../../../utils/objectsInArraysEqual";
import { SuccessMessage } from "./SuccessMessage";
import S from "./styles.module.scss";

interface Donation {
  _id: string
  title: string
  donator?: string
}

export function AddDonator() {
  const [showDonations, setShowDonations] = useState<Donation[]>([]);
  const [donator, setDonator] = useState("");
  const [donationsValues, setDonationsValues] = useState<boolean[]>([]);
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);

  const id = useLocation().pathname.split("/")[2];
  const flyerId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    ListApi.getList(id)
      .then((res) => {
        setShowDonations(res.data.items);
        setDonationsValues(new Array(res.data.items.length).fill(false));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const showDonationsExist = showDonations.length > 0;

  const handleCheckDonation = (position: number) => {
    const values = donationsValues.map((value, index) => index === position ? !value : value);
    setDonationsValues(values);
  }

  const handleChangeDonator = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonator(event.target.value);
  }

  const handleSuccessMessage = () => setIsSuccessMessageOpen(!isSuccessMessageOpen);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkedDonationExists = donationsValues.find(value => value);
    if (!checkedDonationExists) {
      return alert("Escolha uma doação");
    }

    const isDonationsUpdated = objectsInArraysEqual(showDonations, await getUpdatedDonations());
    if (!isDonationsUpdated) {
      alert(`Este item não está mais disponível. Escolha outro item para doação.`);
      return window.location.reload();
    }

    if (!donator) {
      return alert("Insira um nome válido");
    };

    showDonations.forEach((donation, index) => {
      if (donation.donator && donation.donator !== "") {
        return;
      }
      if (donationsValues[index]) {
        const updateDonationRequest = { donator: donator };
        const updateDonationPath = { flyerId, donationId: donation._id };

        ListApi.updateDonation(updateDonationPath, updateDonationRequest)
          .then(async () => {
            setShowDonations(await getUpdatedDonations());
            handleSuccessMessage();
            setDonator("");
          })
          .catch((err) => console.log(err));
      }
    });
  }

  const getUpdatedDonations = async () => (await ListApi.getList(id)).data.items;

  const getCheckedDonationsTitles = () => {
    const checkedDonations = showDonations.filter((donation, index) => donationsValues[index]);
    return checkedDonations.map(donation => donation.title);
  }

  if (!showDonationsExist) {
    return <div>Nenhum item para doação disponível no momento.</div>
  }

  return (
    <>
      {isSuccessMessageOpen && (
        <SuccessMessage
          handleModal={handleSuccessMessage}
          donationsTitles={getCheckedDonationsTitles()}
        />
      )}
      <form onSubmit={handleSubmit}>
        {showDonationsExist &&
          showDonations.map((donation, index) => (
            <div key={donation._id} className={S.field}>
              {donation.donator ? (
                <div>
                  <input type="checkbox" checked disabled />
                  <label className={S.disabled}>{donation.title}</label>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    name={donation.title}
                    value={donation.title}
                    checked={donationsValues[index]}
                    onChange={() => handleCheckDonation(index)}
                  />
                  <label htmlFor={donation._id}>{donation.title}</label>
                </div>
              )}
            </div>
          ))}
        <div className={S.field}>
          <label htmlFor="name">Seu nome:</label>
          <input type="text" name="name" id="name" value={donator} onChange={handleChangeDonator} />
        </div>
        <button type="submit" className="btn btn-primary mt-1">Enviar</button>
      </form>
    </>
  )
};