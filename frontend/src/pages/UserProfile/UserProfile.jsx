import React, { useContext, useEffect, useState } from 'react'
import "./UserProfile.css"
import { BlogContext } from '../../components/Context/Context'

const UserProfile = () => {

  const {user, setUser} = useContext(BlogContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    if (!username || !email) {
      alert("Please fill in all fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (image) formData.append("image", image); 
  
    try {
      const res = await fetch("http://localhost:3000/updateUser", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);  
        alert("User updated successfully!");
      } else {
        alert("An error occurred while updating the user.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating the user.");
    }
  };
  
  return (
    <div className='profile'>
      <div className="userdata">
        <div className="userInfo">
          <div className="userImage">
            <img src={`http://localhost:3000/uploads/${user.profilePic}`} alt="" />
          </div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        <form className='userInfoForm'>
          <h2>Update User</h2>
          <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)} placeholder='username' />
          <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='Email' />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={handleUpdateUser}>Update</button>
        </form>
      </div>
      <div className="createBlogForm">
        <form >
          <h2>Create blog</h2>
          <input type="file" />
          <input type="text" placeholder='Title' />
          <input type="text" placeholder='Category' />
          <textarea placeholder='Description'></textarea>
          <button className='createBlogbtn'>Create blog</button>
        </form>
      </div>
      <div className="myblogs">
        <h1>My blogs</h1>
        <div className="myblogs_bloglist">
          <div className="blog">
            <div className="image">
              <img src="/images/img1.png" alt="Image" />
            </div>
            <div className="info">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
            </div>
            <div className="action-btns">
            <button className="edit-blog-btn">Edit blog</button>
            <button className='delete-blog-btn'>Delete blog</button>
            </div>
          </div>
          <div className="blog">
            <div className="image">
              <img src="/images/img1.png" alt="Image" />
            </div>
            <div className="info">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
            </div>
            <div className="action-btns">
            <button className="edit-blog-btn">Edit blog</button>
            <button className='delete-blog-btn'>Delete blog</button>
            </div>
          </div>
          <div className="blog">
            <div className="image">
              <img src="/images/img1.png" alt="Image" />
            </div>
            <div className="info">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
            </div>
            <div className="action-btns">
            <button className="edit-blog-btn">Edit blog</button>
            <button className='delete-blog-btn'>Delete blog</button>
            </div>
          </div>
          <div className="blog">
            <div className="image">
              <img src="/images/img1.png" alt="Image" />
            </div>
            <div className="info">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
            </div>
            <div className="action-btns">
            <button className="edit-blog-btn">Edit blog</button>
            <button className='delete-blog-btn'>Delete blog</button>
            </div>
          </div>
          <div className="blog">
            <div className="image">
              <img src="/images/img1.png" alt="Image" />
            </div>
            <div className="info">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
            </div>
            <div className="action-btns">
            <button className="edit-blog-btn">Edit blog</button>
            <button className='delete-blog-btn'>Delete blog</button>
            </div>
          </div>
          <div className="blog">
            <div className="image">
              <img src="/images/img1.png" alt="Image" />
            </div>
            <div className="info">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, magni.</p>
            </div>
            <div className="action-btns">
            <button className="edit-blog-btn">Edit blog</button>
            <button className='delete-blog-btn'>Delete blog</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile