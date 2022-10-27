import { useForm } from "./useForm";
import S from "./styles.module.scss";

export function AddDonatorForm() {
  const {
    currentDonations,
    isCheckedArray,
    donator,
    handleChangeCheckbox,
    handleChangeDonator,
    handleDonationsSubmit
  } = useForm();

  const donationsExist = currentDonations.length > 0;

  if (!donationsExist) {
    return <div>Nenhum item para doação disponível no momento.</div>
  }

  return (
    <form onSubmit={handleDonationsSubmit}>
      {donationsExist &&
        currentDonations.map(({ title, donator }, index) => (
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
                  checked={isCheckedArray[index]}
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
          value={donator}
          onChange={handleChangeDonator}
        />
      </div>
      <button type="submit" className={S.button}>Enviar</button>
    </form>
  )
};