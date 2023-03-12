import './App.css';
import Post from "./components/Post";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import {UserContextProvider} from "./components/UserContext";
import CreatePost from "./components/Blog/CreatePost";
import PostPage from "./components/Blog/PostPage";
import EditPost from "./components/Blog/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
