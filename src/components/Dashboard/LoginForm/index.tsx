import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useAuth();
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userRequest = { username, password }
    Auth.login(userRequest)
      .then(() => navigate(state || "/dashboard/flyers"))
      .catch((err) => console.log(err));
  }

  if (Auth.hasAuth()) {
    return (
      <div className="m-2">Usuário está autenticado.<Link to={state} className="d-block">Voltar</Link></div>
    );
  }

  return (
    <main className="position-absolute vw-100 vh-100 bg-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="position-relative top-50 start-50 translate-middle">
        <form className="mx-auto px-5 py-4 rounded bg-white shadow" style={{ maxWidth: "250px" }} onSubmit={handleUserSubmit}>
          <h1>Entrar no Painel</h1>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="mt-2" htmlFor="password">Senha</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <button className="mt-2 btn btn-primary" type="submit">Enviar</button>
          </div>
        </form>
        <small className="d-block mt-5 text-white text-center" style={{ fontFamily: "'Source Serif Pro', serif" }}>
          SSVP - Três Lagoas, {year}
        </small>
      </div>
    </main>
  )
};