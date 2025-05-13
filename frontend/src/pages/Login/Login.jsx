import React, { useContext, useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { BlogContext } from "../../components/Context/Context";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(BlogContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setEmail("");
        setPassword("");
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
       else{
          toast.error("Wrong Credentials!")
      }
    } catch (error) {
      toast.error("An error occured while login");
      console.error(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={handleLogin} >Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register" className='register-link'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login