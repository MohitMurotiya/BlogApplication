import Post from "./Blog/Post";
import {useEffect, useState} from "react";
import BlogService from "../services/blogService";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    BlogService.getAllBlogs().then((response) => {
      setPosts(response)
    })
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}