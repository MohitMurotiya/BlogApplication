import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import AuthService from "../services/authService";
import { useSnackbar } from "notistack";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setUserInfo(userInfo);
  }, []);

  function logout() {
    AuthService.logout();
    setUserInfo(null);
    enqueueSnackbar("Logged-out Successfully!", {
      variant: "success",
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
