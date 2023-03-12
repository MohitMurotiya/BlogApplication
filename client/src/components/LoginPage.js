import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import AuthService from "../services/authService"
import { useSnackbar } from "notistack";

export default function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    AuthService.login(username, password).then((response) => {
      if(response.token) {
        enqueueSnackbar("Logged-In Successfully", {
          variant: "success",
        });
        setUserInfo(response);
        setRedirect(true);
      } else {
        // alert(response.message);
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      }
    })
    }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)} />
      <input type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)} />
      <button>Login</button>
    </form>
  );
}