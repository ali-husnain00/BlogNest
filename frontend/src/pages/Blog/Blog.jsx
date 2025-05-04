import React, { useContext, useEffect, useState } from 'react';
import "./Blog.css";
import { useParams } from 'react-router';
import { BlogContext } from '../../components/Context/Context';

const Blog = () => {
  const { id } = useParams();
  const { allBlogs } = useContext(BlogContext);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = allBlogs.find((b) => b._id === id);
    setBlog(foundBlog);
  }, [id, allBlogs]);

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div className="blog-details-wrapper">
      <div className="blog-details-container">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-meta">
          By <span className="author">{blog.author}</span> · {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown Date"} · {blog.category}
        </p>

        <div className="blog-image-placeholder">
          <img
            src={`http://localhost:3000/uploads/${blog.coverImage}`}
            alt={blog.category}
            className="blog-image"
          />
        </div>

        <div className="blog-content">
          {blog.content.split(/\n{2,}|\r?\n{2,}/)
            .map((para, index) => (
              <p key={index}>{para.trim()}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
