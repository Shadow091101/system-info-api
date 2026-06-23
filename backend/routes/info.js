const os = require("node:os")
const express=require("express");
const { builtinModules } = require("node:module");
const app=express()
const router=express.Router();

router.get("/", (req, res) => {
    res.status(200).json({message:"Server is Live"})
})

router.get("/cpu", (req, res) => {
    res.json({
        architechture: os.machine(),
        os_type: os.type(),
        version_of_os: os.version(),
        Total_Uptime: (os.uptime() / 60).toFixed(2) + " mins",
        hostname: os.hostname(),
        total_memory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        free_memory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB"
    });
})


router.get("/cpu-threads", async (req, res) => {
    const cpuData = []
    for (let i = 0; i < os.cpus().length; i++) {
        cpuData.push({
            thread: i + 1,
            model: os.cpus()[i].model,
            speed: (os.cpus()[i].speed / (1000)).toFixed(2) + " GHz",
            time: {
                "user": (os.cpus()[i].times.user / (1000 * 60)).toFixed(2) + " mins",
                "nice": (os.cpus()[i].times.nice / (1000 * 60)).toFixed(2) + " mins",
                "system": (os.cpus()[i].times.sys / (1000 * 60)).toFixed(2) + " mins",
                "idle": (os.cpus()[i].times.idle / (1000 * 60)).toFixed(2) + " mins",
                "irq": (os.cpus()[i].times.irq / (1000 * 60)).toFixed(2) + " mins",
            }
        })
    }
    // console.log(cpuData);
    res.json(cpuData)
})

router.get("/network-interfaces", (req, res) => {

    const networkint = [];
    const interfaces = os.networkInterfaces();

    for (const name in interfaces) {

        for (const info of interfaces[name]) {

            networkint.push({
                interface: name,
                address: info.address,
                family: info.family,
                mac: info.mac,
                netmask: info.netmask,
                internal: info.internal,
                cidr: info.cidr
            });

        }
    }
    res.json(networkint)
})

module.exports=router