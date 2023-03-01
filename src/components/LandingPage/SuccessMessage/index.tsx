interface SuccessMessageProps {
  handleModal: () => void
  donationsTitles: string[]
}

export function SuccessMessage(props: SuccessMessageProps) {
  return (
    <div className="position-fixed top-0 start-0 vw-100 vh-100 bg-dark bg-opacity-25" style={{ "zIndex": 100 }}>
      <div className="position-relative top-50 start-50 translate-middle w-75 p-3 text-bg-success bg-opacity-100 rounded shadow">
        <div className="mb-3">
          <div>Obrigado pela sua doação!</div>
          <div className="mb-2">Você acabou de escolher os itens:</div>
          <ul className="list-group list-group-numbered">
            {props.donationsTitles.map((title, index) => (
              <li key={index} className="list-group-item">{title}</li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <button className="btn btn-sm btn-primary" style={{ fontFamily: "'Montserrat', sans-serif" }} onClick={props.handleModal}>Fechar</button>
        </div>
      </div>
    </div>
  );
};