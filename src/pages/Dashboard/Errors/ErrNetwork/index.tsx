import { VscDebugDisconnect } from "react-icons/vsc";

export const ErrNetwork = () => {
  return (
    <div className="vh-100 p-5 bg-opacity-10 rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-3 fw-normal text-danger bg-warning bg-opacity-50">Erro de Conexão</h1>
        <VscDebugDisconnect
          className="d-block mx-auto my-4"
          style={{ "fontSize": "120px" }}
        />
        <p className="col-md-8 fs-4">Parece que não estamos conseguindo estabelecer uma conexão com a base de dados. Por favor, entre em contato com o responsável da página para informar o problema.</p>
      </div>
    </div>
  );
}
