import React, { useContext, useState } from 'react'
import "./Register.css"
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { BlogContext } from '../../components/Context/Context';
import Loading from '../../components/Loading/Loading';

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const {BASE_URL} = useContext(BlogContext)

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })
      if (res.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        toast.success("Registered successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
      else {
        toast.error("An error occured while creating user")
      }
    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  if(loading){
    return <Loading/>
  }


  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={handleRegister}>Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className='login-link'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register