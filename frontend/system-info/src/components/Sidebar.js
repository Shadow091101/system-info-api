import React, { useEffect, useState } from 'react'

const Sidebar = ({ activeTab, setActiveTab }) => {
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
        </div>
    )
}

export default Sidebar;