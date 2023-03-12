import { useState } from "react";
import AuthService from "../services/authService"
import { useSnackbar } from "notistack";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    AuthService.register(email, username, password).then((response) => {
      if (response.message.includes("successfully")) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
        setRedirect(true);
      } else {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      }
    })
  }

  if (redirect) {
    return <Navigate to={'/login'} />
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="email"
        placeholder="email"
        value={email}
        required
        onChange={ev => setEmail(ev.target.value)} />
      <input type="text"
        placeholder="username"
        value={username}
        required
        onChange={ev => setUsername(ev.target.value)} />
      <input type="password"
        placeholder="password"
        value={password}
        required
        onChange={ev => setPassword(ev.target.value)} />
      <button>Register</button>
    </form>
  );
}