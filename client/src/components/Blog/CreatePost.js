import 'react-quill/dist/quill.snow.css';
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor/Editor";
import BlogService from '../../services/blogService';
import { UserContext } from "../UserContext";
import { useSnackbar } from "notistack";

export default function CreatePost() {
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);

  async function createNewPost(ev) {
    const data = { title, cover, description, content }
    ev.preventDefault();

    BlogService.saveBlog(userInfo.username, data).then((response) => {
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
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        placeholder={'Description'}
        value={description}
        onChange={ev => setDescription(ev.target.value)} />
      <input type="url"
        placeholder={'Cover'}
        value={cover}
        onChange={ev => setCover(ev.target.value)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
}