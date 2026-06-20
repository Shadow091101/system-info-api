import React, { useEffect, useState } from 'react'
import './CPUInfo.css'

function CPUInfo() {

    const [data, setData] = useState({});
    useEffect(() => {
        const CPUInfo = async (req, res) => {

            try {

                const response = await fetch("http://localhost:9009/cpu")
                const result = await response.json()
                console.log(result)
                setData(result);
            } catch (err) {
                console.error(err);
            };
        }
        CPUInfo()
    }, [])
    return (
        <div className="cpu-container">

            <div className="cpu-header">

                <div>
                    <h1 className="cpu-heading">
                        💻 System Information                    
                    </h1>

                    <p className="cpu-subheading">
                        View operating system, memory usage, uptime, and host details.                    </p>
                </div>

            </div>

            <div className="cpu-grid">

                <div className="cpu-card">
                    <div className="cpu-title">Architecture</div>
                    <div className="cpu-value">{data.architechture}</div>
                </div>

                <div className="cpu-card">
                    <div className="cpu-title">Operating System</div>
                    <div className="cpu-value">{data.os_type}</div>
                </div>

                <div className="cpu-card">
                    <div className="cpu-title">Hostname</div>
                    <div className="cpu-value">{data.hostname}</div>
                </div>

                <div className="cpu-card">
                    <div className="cpu-title">Total Memory</div>
                    <div className="cpu-value">{data.total_memory}</div>
                </div>

                <div className="cpu-card">
                    <div className="cpu-title">Free Memory</div>
                    <div className="cpu-value">{data.free_memory}</div>
                </div>

                <div className="cpu-card">
                    <div className="cpu-title">Uptime</div>
                    <div className="cpu-value">{data.Total_Uptime}</div>
                </div>

            </div>

        </div>
    )
}

export default CPUInfo