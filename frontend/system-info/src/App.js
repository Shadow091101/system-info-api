// import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import CPUInfo from './components/CPUInfo';
import CPUThreads from './components/CPUThreads';
import NetInt from './components/NetInt';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate
} from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("cpu")
  const renderComponent = () => {
    switch (activeTab) {
      case "cpu":
        return <CPUInfo />
      case "threads":
        return <CPUThreads />
      case "NetInt":
        return <NetInt />
      default:
        return
    }
  };
  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}></Sidebar>
      <div className="loadcontainer">
        {renderComponent()}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
