const { log } = require("node:console");
const os= require("node:os");

console.log("+".repeat(50))
console.log("+"+" ".repeat(48)+"+");
console.log("+"+" ".repeat(12)+"Your System Information."+" ".repeat(12)+"+");
console.log("+"+" ".repeat(48)+"+");
console.log("+".repeat(50))
console.log("");
console.log();

console.log("1) The machine is of architechture: "+os.machine());
console.log("2) You are using "+os.type()+" Operating System and its version is "+os.version()+".");
console.log("3) Total Uptime of you machine is "+(os.uptime()/60).toFixed(2)+" mins");
console.log("4) The host of this CPU is "+os.hostname());
console.log("5) The free memory in your laptop is "+(os.freemem()/(1024*1024*1024)).toFixed(2)+" GB")
console.log("6) The total memmory your laptop have is "+(os.totalmem()/(1024*1024*1024)).toFixed(2)+" GB");

console.log("7) Total active CPU Thread : "+os.cpus().length);

console.log("+=".repeat(30));


console.log("Below are more detail of the active CPU Thread ")

console.log("+=".repeat(30));

for(let i=0;i<os.cpus().length;i++){
    
    let MODEL=os.cpus()[i].model
    let SPEED=(os.cpus()[i].speed/(1000)).toFixed(2)+" GHz"
    let TIME={
        "user":(os.cpus()[i].times.user/(1000*60)).toFixed(2)+" mins",
        "nice":(os.cpus()[i].times.nice/(1000*60)).toFixed(2)+" mins",
        "system":(os.cpus()[i].times.sys/(1000*60)).toFixed(2)+" mins",
        "idle":(os.cpus()[i].times.idle/(1000*60)).toFixed(2)+" mins",
        "irq":(os.cpus()[i].times.irq/(1000*60)).toFixed(2)+" mins",
    }
    console.log("CPU Thread : "+(i+1));
    
    console.log("Model Name :"+MODEL);
    console.log("Speed in GHz : "+SPEED)
    console.log("The following logical CPU threads have accumulated the usage times shown below: ");
    console.log(TIME);
    console.log("----------------------------")
}

// console.log(os.loadavg());
const Interfaces=os.networkInterfaces();
for(const name in Interfaces){
    console.log(`\n Interface: ${name}`);
    for(const info of Interfaces[name]){
        console.log(info);
    }
}


