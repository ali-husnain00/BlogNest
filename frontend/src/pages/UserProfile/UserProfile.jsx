import React, { useContext, useEffect, useState } from 'react'
import "./UserProfile.css"
import { BlogContext } from '../../components/Context/Context'
import {toast } from 'react-toastify';

const UserProfile = () => {

  const { user, setUser, fetchAllBlogs, BASE_URL } = useContext(BlogContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogImage, setBlogImage] = useState(null);

  const [userBlogs, setUserBlogs] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [editBlogId, setEditBlogId] = useState("");

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (!username || !email) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${BASE_URL}/updateUser`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        toast.success("User updated successfully!");
      } else {
        toast.error("An error occurred while updating the user.");
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false)
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if(!blogImage || !blogTitle || !blogCategory || !blogContent){
      toast.warning("All fields are required!")
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", blogImage);
    formData.append("blogTitle", blogTitle);
    formData.append("blogContent", blogContent);
    formData.append("blogCategory", blogCategory);
    formData.append("email", user.email);

    try {
      const res = await fetch(`${BASE_URL}/createBlog`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setBlogTitle("");
        setBlogCategory("");
        setBlogContent("");
        setBlogImage(null);
        toast.success("Blog created successfully!");
        getUserBlogs();
        fetchAllBlogs();
      } 
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  const getUserBlogs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getUserBlogs`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json'
        },
        credentials: "include"
      })
      if (res.ok) {
        const data = await res.json();
        setUserBlogs(data);
      }
      else {
        console.log("An error occured while getting the user blogs")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserBlogs();
  }, [user])


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
        getUserBlogs();
        fetchAllBlogs();
      }
      else{
        toast.error("An error occured while deleting the blog")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditBlog = async (id, blog) => {
    setIsEdit(true);
    setEditBlogId(id);
    setBlogTitle(blog.title);
    setBlogCategory(blog.category);
    setBlogContent(blog.content);
  };
  

  const handleUpdateBlog  = async (e) =>{
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("image", blogImage);
    formData.append("blogTitle", blogTitle);
    formData.append("blogContent", blogContent);
    formData.append("blogCategory", blogCategory)

    try {
      const res = await fetch(`${BASE_URL}/updateBlog/${editBlogId}`,{
        method: "PUT",
        credentials:"include",
        body:formData
      })
      if(res.ok){
        setBlogTitle("");
        setBlogCategory("");
        setBlogContent("");
        setBlogImage(null);
        toast.success("Blog updated successfully!");
        setIsEdit(false);
        setEditBlogId("");
        getUserBlogs();
        fetchAllBlogs();
      }
      else{
        toast.error("An error occured while updating the blog")
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }

  }

  return (
    <div className='profile'>
      <div className="userdata">
        <div className="userInfo">
          <div className="userImage">
            <img src={`${BASE_URL}/uploads/${user.profilePic}`} alt="" />
          </div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        <form className='userInfoForm'>
          <h2>Update User</h2>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button disabled = {loading} onClick={handleUpdateUser}>Update</button>
        </form>
      </div>
      <div className="createBlogForm">
        <form >
          <h2>{isEdit ? "Update blog" : "Create blog"}</h2>
          <input type="file" onChange={(e) => setBlogImage(e.target.files[0])} />
          <input type="text" placeholder='Title' value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
          <input type="text" placeholder='Category' value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)}  />
          <textarea placeholder='Content' value={blogContent} onChange={(e) =>setBlogContent(e.target.value)}></textarea>
          <button className='createBlogbtn' disabled = {loading} onClick={isEdit ? handleUpdateBlog : handleCreateBlog}>{isEdit ? "Update blog" : "Create blog" }</button>
        </form>
      </div>
      <div className="myblogs">
        <h1>My blogs</h1>
        <div className="myblogs_bloglist">
          {
            userBlogs.length > 0 ?
              (
                userBlogs.map((blog) => {
                  return (
                    <div className="blog" key={blog._id}>
                    <div className="image">
                      <img src={`${BASE_URL}/uploads/${blog.coverImage}`} alt="Image" />
                    </div>
                    <div className="info">
                      <h4>{blog.title}</h4>
                    </div>
                    <div className="action-btns">
                      <button className="edit-blog-btn" onClick={() =>handleEditBlog(blog._id, blog)}>Edit blog</button>
                      <button className='delete-blog-btn' onClick={() =>handleDeleteBlog(blog._id)}>Delete blog</button>
                    </div>
                  </div>
                  )
                })
              ) :
              (
                <p> No Post Yet</p>
              )
          }

        </div>
      </div>
    </div>
  )
}

export default UserProfile