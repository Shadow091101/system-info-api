import React, { useEffect, useState } from 'react'
import "./CPUThreads.css"

function CPUThreads() {

    const [threads, setThreads] = useState([])
    useEffect(() => {

        const getCPUThreadinfo = async () => {
            const response = await fetch("http://localhost:9009/cpu-threads")
            const result = await response.json();

            setThreads(result);
        }
        getCPUThreadinfo()

    }, [])


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

            <div className="thread-grid">

                {threads.map(thread => (

                    <div className="thread-card" key={thread.thread}>

                        <div className="thread-number">
                            Thread {thread.thread}
                        </div>

                        <div className="thread-model">
                            {thread.model}
                        </div>

                        <div className="thread-speed">
                            {thread.speed}
                        </div>

                        <div className="stats">

                            <div className="stat">
                                User<br />
                                {thread.time.user}
                            </div>

                            <div className="stat">
                                System<br />
                                {thread.time.system}
                            </div>

                            <div className="stat">
                                Idle<br />
                                {thread.time.idle}
                            </div>

                            <div className="stat">
                                IRQ<br />
                                {thread.time.irq}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default CPUThreads
