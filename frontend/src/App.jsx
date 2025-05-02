import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
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

const App = () => {

  const {loading} = useContext(BlogContext);

  if(loading){
    return <Loading/>
  }

  return (
    <div className='app'>
      <Navbar />
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
        <Route path='/blog' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App