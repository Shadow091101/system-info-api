const express = require('express');
const app = express()
const os = require("node:os")
const cors = require("cors")
const swaggerUi=require("swagger-ui-express")
const swaggerDocument=require("./swagger.json");
const infoRouter=require("./routes/info")


app.use(cors())
app.use(express.json());
app.use("/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
)

app.use("/",infoRouter)

const port = 9009
app.listen(port, "0.0.0.0", () => {
    console.log(`You app is running at Port http://localhost:${port}`);
})

