import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import S from "./styles.module.scss";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userRequest = { username, password }
    Auth.login(userRequest)
      .then(() => navigate(state || "/dashboard/flyers"));
  }

  return (
    <main className={S.container}>
      <form className={S.form} onSubmit={handleUserSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Nome de usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <small>SSVP Três Lagoas @2022</small>
      </form>
    </main>
  )
};