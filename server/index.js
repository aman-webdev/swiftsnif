const express = require("express");
const { config } = require("dotenv");
const  errorMiddleware  = require("./middlewares/error.middleware.js");
const urlRouter = require("./routes/url.routes.js");
const mongoConnect = require("./utils/connectToMongoose.js")
const path = require("path")
const cors = require("cors")

config();

mongoConnect(process.env.MONGOOSE_URL).then(()=>console.log('Connected to DB'))

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.json())

app.use("/", urlRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));
