import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";

export function useForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  };

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  };

  function handleUserSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = {
      username,
      password
    };

    login(user)
      .then(res => {
        localStorage.setItem("ssvpUser", JSON.stringify(res.data));
        setUser(res.data);
        window.location.reload();
        navigate("/dashboard");
      })
      .catch(error => console.log(error));
  };

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleUserSubmit
  };
};