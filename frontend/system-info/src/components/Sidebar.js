import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navigate=useNavigate();
    const handleLogout=()=>{
            localStorage.removeItem('token')
            navigate('/login')
    }
    return (
        <div className="sidebar">
            <h2>System Info</h2>
            <button className={activeTab === "cpu" ? "active" : ""} onClick={() => setActiveTab("cpu")}>
                CPU Information
            </button>
            <button className={activeTab === "threads" ? "active" : ""} onClick={() => setActiveTab("threads")}>
                CPU Threads
            </button>
            <button className={activeTab === "NetInt" ? "active" : ""} onClick={() => setActiveTab("NetInt")}>Network Interfaces</button>
            <button onClick={()=>handleLogout()}>Logout</button>
        </div>
    )
}

export default Sidebar;