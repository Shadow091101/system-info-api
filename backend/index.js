require('dotenv').config();
const express = require('express');
const app = express()
const cors = require("cors")
const swaggerUi=require("swagger-ui-express")
const swaggerDocument=require("./swagger.json");
const infoRouter=require("./routes/info")
const connectToMongo=require("./db")

app.use(cors())
app.use(express.json());
// app.use(bodyParser.json())

app.use("/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
)

app.use("/",infoRouter)
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "Healthy",
        instance: process.env.INSTANCE_NAME || require("os").hostname()
    });
});

app.use('/api/v1/auth', require('./routes/auth'));

const port = process.env.PORT || 9009

connectToMongo().then(()=>{
    app.listen(port, "0.0.0.0", () => {
    console.log(`You app is running at Port ${port}`);
})
})
.catch((err)=>{
    console.error("MongoDB connection failed : ",err);
    process.exit(1)
})