import { Route, Routes } from 'react-router'
import './App.css'
import SideBar from './components/sideBar/SideBar'
import Home from './components/home/Home'

function App() {

  return (
    <>
      <SideBar />

      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
