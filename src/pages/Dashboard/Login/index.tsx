import { useForm } from "./useForm";
import S from "./styles.module.scss";

export function Login() {
  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleUserSubmit
  } = useForm();

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