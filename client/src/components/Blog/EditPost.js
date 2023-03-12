import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor/Editor";
import { UserContext } from "../UserContext";
import { useSnackbar } from "notistack";
import BlogService from "../../services/blogService";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    BlogService.getBlogById(id).then((postInfo) => {
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setDescription(postInfo.description);
      setCover(postInfo.cover);
    })
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = {id, title, cover, description, content}
    BlogService.updateBlogById(data, userInfo.id, id).then((response) => {
      if(response.message.includes("successfully")){
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
    return <Navigate to={'/post/' + id} />
  }

  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update post</button>
    </form>
  );
}