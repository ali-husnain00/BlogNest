import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Conatct from './pages/Contact/Conatct'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UserProfile from './pages/UserProfile/UserProfile'
import Navbar from './components/Navbar/Navbar'
import Blog from './pages/Blog/Blog'
import PrivateRoute from './components/Context/PrivateRoute'
import { BlogContext } from './components/Context/Context'
import Loading from './components/Loading/Loading'
import Footer from './components/Footer/Footer'
import Admin from './pages/Admin/Admin'
import AdminRoute from './components/Context/AdminRoute'

const App = () => {

  const {loading} = useContext(BlogContext);
  const location = useLocation();

  const HideLayout = location.pathname.startsWith("/admin");

  if(loading){
    return <Loading/>
  }

  return (
    <div className='app'>
      {!HideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Conatct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/userProfile' element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/admin' element = {
          <AdminRoute>
            <Admin/>
          </AdminRoute>
        } />
      </Routes>
      {!HideLayout && <Footer/>}
    </div>
  )
}

export default App