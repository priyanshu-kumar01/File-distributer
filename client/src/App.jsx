// import './App.css'
// import { Route, Routes } from 'react-router-dom'
// import Login from './pages/Login.jsx'
// import DashBoard from './pages/DashBoard.jsx'
// import UploadCSV from './pages/UploadCSV.jsx'
// import Agents from './pages/Agents.jsx'
// import Navbar from './components/Navbar.jsx'
// import ProtectedRoute from './components/ProtectedRoute.jsx'


// function App() {

//   return (
//     <>
//     <Navbar/>
//     <Routes>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/' element={<ProtectedRoute><DashBoard/></ProtectedRoute>} />
//       <Route path="/upload" element={<ProtectedRoute><UploadCSV/></ProtectedRoute>} />
//       <Route path="/agent" element={<ProtectedRoute><Agents/></ProtectedRoute>} />

//     </Routes>
//     </>
//   )
// }

// export default App



import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login.jsx'
import DashBoard from './pages/DashBoard.jsx'
import UploadCSV from './pages/UploadCSV.jsx'
import Agents from './pages/Agents.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // login state

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route 
          path='/login' 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path='/' 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashBoard/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UploadCSV/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agent" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Agents/>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
