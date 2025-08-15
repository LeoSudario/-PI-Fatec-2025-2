import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from "./components/Routes/Home";
import About from "./components/Routes/About";
import Contact from "./components/Routes/Contact";
import NavBar from "./components/navBar";
import Inputs from './components/inputsClient';
import InputGym from './components/inputGym';
import Dashboard from './components/Dashboard';
import Login from './components/login';
import { authFetch } from './components/authFetch';
import './App.css';


function App() {
  const [gyms, setGyms] = useState([]);
  const [clients, setClients] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState("");

  console.log(clients);

  const fetchClients = async () => {
    try {
      const data = await authFetch("http://localhost:5000/clients");
      setClients(data);
    } catch (e) {
      setClients([]);
    }
  };

  const fetchGyms = async () => {
    try {
      const data = await authFetch("http://localhost:5000/gyms");
      setGyms(data);
    } catch (e) {
      setGyms([]);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setGyms([]);
    setClients([]);
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
      fetchGyms();
    }
  }, [isAuthenticated]);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser(username);
    fetchClients();
    fetchGyms();
  };

  const handleGymAdded = () => {
    fetchClients();
    fetchGyms();
  };

  const handleClientAdded = () => {
    fetchClients();
    fetchGyms();
  };

  const handleDelete = () => {
    fetchClients();
    fetchGyms();
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Router>
        <NavBar onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            <>
              <Dashboard gym={gyms} onGymRemoved={handleDelete} />
              <InputGym onGymAdded={handleGymAdded} />
              <Inputs onClientAdded={handleClientAdded} onClientDeleted={handleClientAdded} username={user} />
              <Home />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={
            <>
              <InputGym onGymAdded={handleGymAdded} />

              <Contact />
            </>
          } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;