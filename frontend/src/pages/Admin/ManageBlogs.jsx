import React, { useContext } from 'react';
import "./ManageBlogs.css";
import { BlogContext } from '../../components/Context/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const ManageBlogs = () => {
  const { allBlogs, fetchAllBlogs, BASE_URL } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleDeleteBlog = async (id) =>{
    try {
      const res = await fetch(`${BASE_URL}/deleteBlog/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include'
      })
      if(res.ok){
        toast.success("Blog deleted successfully!");
        fetchAllBlogs();
      }
      else{
        toast.error("An error occured while deleting the blog")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="manage-blogs-container">
      <h2>All Blogs</h2>
      <div className="table-resp-container">
        <table className="blogs-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBlogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.category}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ManageBlogs;
