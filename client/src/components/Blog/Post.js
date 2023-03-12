import { Link } from "react-router-dom";

export default function Post({ id, title, description, cover, content, createdDate, user }) {

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${id}`}>
          <img src={cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{user.username}</a>
          <time>{createdDate}</time>
        </p>
        <p className="summary">{description}</p>
      </div>
    </div>
  );
}