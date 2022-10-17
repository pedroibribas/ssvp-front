import { FormEvent, useEffect, useState } from "react";
import { addDonator, getDonations } from "../../api/donation";
import S from "./styles.module.scss";

type Donation = {
  id: string;
  title: string;
  donator: string;
};

export function AddDonatorForm() {
  const [donations, setDonations] = useState<Donation[]>([]);

  const [checkedData, setCheckedData] = useState<boolean[]>([]);

  const [name, setName] = useState("");

  const donationsExist = donations.length > 0;

  useEffect(() => {
    getDonations()
      .then(res => {
        const data = res.data.map((donation: Donation) => (
          {
            id: donation.id,
            title: donation.title,
            donator: donation.donator || ""
          }
        ));
        setDonations(data);
        setCheckedData(new Array(data.length).fill(false));
      });
  }, []);

  function handleChangeCheckbox(position: number) {
    const updatedCheckedData = checkedData.map((box, index) =>
      index === position ? !box : box
    );
    setCheckedData(updatedCheckedData);
  };

  function handleChangeName(event: any) {
    setName(event.target.value);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name || name === "") {
      alert("Insira um nome válido");
      return;
    };

    const checkedDonations = donations.map((donation, index) => (
      {
        id: donation.id,
        isChecked: checkedData[index],
      }
    ));

    const data = {
      name,
      donations: checkedDonations
    };

    addDonator(data)
      .then(() => window.location.reload())
      .catch(() => alert("Escolha uma doação disponível"));
  };

  if (!donationsExist) {
    return <div>Nenhum item para doação disponível no momento.</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      {donationsExist &&
        donations.map(({ title, donator }, index) => (
          <div key={index} className={S.field}>
            {donator ? (
              <>
                <input disabled type="checkbox" checked />
                <label className={S.disabled}>{title}</label>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={title}
                  value={title}
                  checked={checkedData[index]}
                  onChange={() => handleChangeCheckbox(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>
                  {title}
                </label>
              </>
            )}
          </div>
        ))}
      <div className={S.field}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <button type="submit" className={S.button}>Enviar</button>
    </form>
  )
};