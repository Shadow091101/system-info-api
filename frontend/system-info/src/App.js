import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import CPUInfo from './components/CPUInfo';
import CPUThreads from './components/CPUThreads';
import NetInt from './components/NetInt';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

function App() {
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

export default App;
