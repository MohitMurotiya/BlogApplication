import axios from "axios";
import authHeader from "./authHeader";

const BLOG_URL = "http://localhost:8080/api/auth/";

class BlogService {

    /*Required */
    getAllBlogs() {
        return axios.get("http://localhost:8080/api/blogs")
        .then((response) => {
            return response.data
        }).catch((err) => {
            return err.response.data;
        })
    }

    getBlogById(blogId) {
        return axios.get(BLOG_URL + `blog/${blogId}`, {
            headers: authHeader()
        }).then((response) => {
            return response.data;
        }).catch((err) => {
            return err.response.data;
        })
    }

    updateBlogById(blog, userId, blogId) {
        return axios.put(BLOG_URL + `user/${userId}/blog/${blogId}`, blog, {
            headers: authHeader()
        }).then((response) => {
            return response.data;
        }).catch((err) => {
            return err.response.data;
        })
    }

    saveBlog(username, blog) {
        return axios.post(BLOG_URL + `user/${username}/blog`, blog, {
            headers: authHeader()
        }).then((response) => {
            return response.data;
        }).catch((err) => {
            return err.response.data;
        })
    }
}

export default new BlogService();