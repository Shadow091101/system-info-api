import React, { useEffect, useState } from 'react'
import "./CPUThreads.css"

function CPUThreads() {

    const [threads, setThreads] = useState([])
    const [selectedThread, setSelectedThread] = useState("")

    useEffect(() => {
        const getCPUThreadinfo = async () => {
            const response = await fetch("http://localhost:9009/cpu-threads")
            const result = await response.json();

            setThreads(result);
            if(result.length>0){
                setSelectedThread(result[0].thread.toString());
            }
        }
        getCPUThreadinfo();
    }, [])


    const currentThread = threads.find(
        (thread) => thread.thread.toString() === selectedThread
    );

    // console.log(currentThread)
    return (
        <div className="thread-container">
            <div className="thread-header">
                <div>
                    <h1 className="thread-heading">
                        🧠 CPU Threads
                    </h1>

                    <p className="thread-subheading">
                        Monitor all logical processor threads, speeds, and execution statistics in real time.
                    </p>
                </div>

            </div>

            <div className="dropdown">
                <select value={selectedThread} onChange={(e) => setSelectedThread(e.target.value)}>
                    <option value="">Select Thread</option>
                    {threads.map(thread => (
                        <option key={thread.thread} value={thread.thread}>
                            Thread {thread.thread}
                        </option>
                    ))}
                </select>
            </div>
            <div className="thread-grid">
                {/* {threads.map(thread => ( */}
                {
                    currentThread && (
                    <div className="thread-card" key={currentThread.thread}>

                        <div className="thread-number">
                            Thread {currentThread.thread}
                        </div>
                        <div className="thread-model">
                            {currentThread.model}
                        </div>
                        <div className="thread-speed">
                            {currentThread.speed}
                        </div>
                        <div className="stats">
                            <div className="stat" style={{fontWeight:"bold"}}>
                                User<br />
                                {currentThread.time.user}
                            </div>
                            <div className="stat" style={{fontWeight:"bold"}}>
                                System<br />
                                {currentThread.time.system}
                            </div>
                            <div className="stat" style={{fontWeight:"bold"}}>
                                Idle<br />
                                {currentThread.time.idle}
                            </div>

                            <div className="stat" style={{fontWeight:"bold"}}>
                                IRQ<br />
                                {currentThread.time.irq}
                            </div>

                        </div>

                    </div>
                    )}

            </div>

        </div>
    )
}

export default CPUThreads