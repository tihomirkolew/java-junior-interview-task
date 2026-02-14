import { Route, Routes } from 'react-router'
import './App.css'
import SideBar from './components/sideBar/SideBar'
import Home from './components/home/Home'
import UserDetails from './components/UserDetails/UserDetails'

function App() {

  return (
    <>
      <SideBar />

      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/create" element={<h1>Create user</h1>} />
          <Route path="/details" element={<UserDetails />} />
          <Route path="/list" element={<h1>All users</h1>} />
          <Route path="/search" element={<h1>Search users</h1>} />
          <Route path="/edit" element={<h1>Edit user</h1>} />
          <Route path="/delete" element={<h1>Delete user</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
