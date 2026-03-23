import { Route, Routes } from 'react-router'
import './App.css'
import SideBar from './components/sideBar/SideBar'
import Home from './components/home/Home'
import UserDetails from './components/UserDetails/UserDetails'
import UserCreate from './components/userCreate/UserCreate'
import UserList from './components/userList/UserList'
import UserSearch from './components/userSearch/UserSearch'
import UserEdit from './components/userEdit/UserEdit'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Logout from './components/logout/Logout'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute'
import GuestRoute from './components/protectedRoutes/GuestRoute'

function App() {

  return (
    <>
      <SideBar />

      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<UserCreate />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/list" element={<UserList />} />
            <Route path="/search" element={<UserSearch />} />
            <Route path="/edit" element={<UserEdit />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App
