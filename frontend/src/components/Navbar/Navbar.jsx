import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BlogContext } from '../Context/Context';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const { user, setUser, BASE_URL} = useContext(BlogContext);
  const navigate = useNavigate();
  const location = useLocation();  
  const [selectedOption, setSelectedOption] = useState("");  
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (user) {
      if (location.pathname === '/userProfile') {
        setSelectedOption('profile');
      } else {
        setSelectedOption('greeting');
      }
    }
  }, [user, location.pathname]); 

  const handleProfile = () => {
    if (user) {
      navigate("/userProfile");
    } else {
      toast.warning("Please Login First");
      setTimeout(() =>{
        navigate("/login");
      },1500)
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (res.ok) {
        setUser(null);  
        toast.success("Logout successful");
        setTimeout(() =>{
           navigate("/login");
        },1500)
      } else {
        toast.error("An error occurred while logging out");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value); 
    setMenuActive(false)

    if (value === "profile") {
      handleProfile();
    } else if (value === "logout") {
      handleLogout();
    }
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <h1>BlogNest</h1>
      </div>
      <ul className={`navlinks ${menuActive ? "active" : ""}`}>
        <span><i class="fa-solid fa-xmark close-menu" onClick={() =>setMenuActive(!menuActive)}></i></span>
        <Link to="/"><li onClick={() =>setMenuActive(menuActive === true ? false : false)}>Home</li></Link>
        <Link to="/about"><li onClick={() =>setMenuActive(menuActive === true ? false : false)}>About</li></Link>
        <Link to="/contact"><li onClick={() =>setMenuActive(menuActive === true ? false : false)}>Contact</li></Link>
        <Link className={user?.role === "admin" ? "show" : "hide"} to="/admin"><li onClick={() =>setMenuActive(menuActive === true ? false : false)}>Admin Panel</li></Link>
        {
          user ? (  
            <select value={selectedOption} onChange={handleChange}>
              <option value="greeting" disabled>Hi👋 {user.username}</option>
              <option value="profile">My Profile</option>
              <option value="logout">Logout</option>
            </select>
          ) : (  
            <Link to="/login"><i className='login-btn' onClick={() =>setMenuActive(menuActive === true ? false : false)}>Login</i></Link>
          )
        }
      </ul>
      <i className="fa-solid fa-bars menu" onClick={() =>setMenuActive(!menuActive)}></i>
    </div>
  );
};

export default Navbar;
