import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import RideTracker from './components/RideTracker/RideTracker'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import './App.css'
import Blog from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/ride-tracker" 
              element={
                <ProtectedRoute>
                  <RideTracker />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tire-selection" element={<RideTracker />} />
          </Routes>
          <a href="https://chat.whatsapp.com/EcupFGHSwao7T5mAoYjJv8" class="community-rides">🏁 Community Rides Join weekly adventures</a>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
