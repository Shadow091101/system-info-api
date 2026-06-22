import React, { useEffect, useState } from 'react'
import "./NetInt.css"
//import { options } from '../../../../backend/routes/info'

function NetInt() {

    const [networks, setNetIntData] = useState([])
    const[NetInt,setNetInt]=useState("")
    useEffect(() => {
        const getNetIntData = async () => {
            const response = await fetch("http://localhost:9009/network-interfaces")
            const data = await response.json()
            setNetIntData(data)

            if(data.length>0){
                setNetInt(data[0].interface)
            }
        }
        getNetIntData()
    }, [])

    const currentnetInt=networks.find(
        (network) => network.interface.toString() === NetInt
    )
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

                <select value={NetInt} onChange={(e)=>setNetInt(e.target.value)}>
                    <option value="">Select Network Interfaces</option>
                    {networks.map(network=>(
                        <option key={network.interface} value={network.interface}>
                            {network.interface}
                        </option>
                    ))}
                </select>
            <div className="network-grid">
                {currentnetInt && 
                

                    <div className="network-card" >

                        <div className="network-name">
                            {currentnetInt.interface}
                        </div>

                        <div className="network-row">
                            <strong>Address:</strong> {currentnetInt.address}
                        </div>

                        <div className="network-row">
                            <strong>Family:</strong> {currentnetInt.family}
                        </div>

                        <div className="network-row">
                            <strong>MAC:</strong> {currentnetInt.mac}
                        </div>

                        <div className="network-row">
                            <strong>CIDR:</strong> {currentnetInt.cidr}
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default NetInt