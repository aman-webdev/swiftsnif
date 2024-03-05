const express = require("express");
const { config } = require("dotenv");
const  errorMiddleware  = require("./middlewares/error.middleware.js");
const urlRouter = require("./routes/url.routes.js");
const mongoConnect = require("./utils/connectToMongoose.js")
const path = require("path")
const cors = require("cors")
const cluster = require("cluster")
const os = require("os")
config();


const availableCPUs = os.cpus().length
console.log('Total CPUS ',availableCPUs)
mongoConnect(process.env.MONGOOSE_URL).then(()=>{
    
})
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < availableCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork()
    });
  } else {

    const PORT = process.env.PORT || 3000;
    const app = express();
    app.use(cors())
    app.use(express.json())
    
    app.get('/health',(req,res)=>{
        res.status(200).send(`Hello from Test route ${ process.pid}`)
    }
    )
    app.use("/", urlRouter);
    
    app.use(errorMiddleware);
    
    app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));
  }



