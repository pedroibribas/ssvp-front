import Logo from "../../images/ssvp-logo.png"
import { useForm } from "./useForm";

export function LoginForm() {
    const { input, controller } = useForm();

    const currentYear = new Date().getFullYear();

    return (
        <form
            className="d-flex flex-column align-items-center"
            onSubmit={controller.handleUserSubmit}
        >
            <img src={Logo} alt="logomarca da SSVP" className="mb-3" />
            <h1 className="h2 mb-3 fw-normal">
                Acessar painel
            </h1>

            <div>
                <label className="form-label" htmlFor="username">
                    Usuário
                </label>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="username"
                    id="username"
                    value={input.username}
                    onChange={controller.handleUsernameChange}
                    required
                />
            </div>

            <div>
                <label className="form-label" htmlFor="password">
                    Senha
                </label>
                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    id="password"
                    value={input.password}
                    onChange={controller.handlePasswordChange}
                    required
                />
            </div>

            <div>
                <button type="submit" className="mb-5 btn btn-md btn-primary">
                    Enviar
                </button>
            </div>

            <small className="text-muted">
                SSVP Três Lagoas &copy;{currentYear}
            </small>
        </form>
    )
};