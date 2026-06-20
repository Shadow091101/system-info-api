import React, { useEffect, useState } from 'react'
import "./NetInt.css"

function NetInt() {

    const [networks, setNetIntData] = useState([])
    useEffect(() => {
        const getNetIntData = async () => {
            const response = await fetch("http://localhost:9009/network-interfaces")
            const data = await response.json()

            setNetIntData(data)
        }
        getNetIntData()
    }, [])
    return (
        <div className="network-container">
            <div className="netint-header">
                <div>
                    <h1 className="netint-heading">
                        🌐 Network Interfaces
                    </h1>
                    <p className="netint-subheading">
                        Inspect available network adapters, IP addresses, and connectivity details.
                    </p>                
                </div>
            </div>

            <div className="network-grid">

                {networks.map((network, index) => (

                    <div className="network-card" key={index}>

                        <div className="network-name">
                            {network.interface}
                        </div>

                        <div className="network-row">
                            <strong>Address:</strong> {network.address}
                        </div>

                        <div className="network-row">
                            <strong>Family:</strong> {network.family}
                        </div>

                        <div className="network-row">
                            <strong>MAC:</strong> {network.mac}
                        </div>

                        <div className="network-row">
                            <strong>CIDR:</strong> {network.cidr}
                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default NetInt