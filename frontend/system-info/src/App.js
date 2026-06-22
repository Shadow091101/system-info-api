import logo from './logo.svg';
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
  Navigate
} from 'react-router-dom';

function ProtectedRoute({isLoggedIn,children}){
  if(!isLoggedIn){
    return <Navigate to="/login"/>
  }
  return children;
}

function Dashboard(){
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
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  return (
    <Routes>
      <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard/></ProtectedRoute>}/>
    </Routes>
  )

      
}

export default App;
