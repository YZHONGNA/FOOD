import './App.css';
import { useState } from 'react';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSuccessfulLogin = () => {setIsLoggedIn(true);};
  const handleLogout = () => {setIsLoggedIn(false);};
  return (
    <div className="app">
      {isLoggedIn ? (<Home onLogout={handleLogout} />) : (<LoginSignup onLogin={handleSuccessfulLogin} />)}
    </div>
  );
}

export default App;
