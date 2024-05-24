const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }))
app.use(cors())


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(data=>console.log(data?"connected to mongodb":""))
    .catch((err) =>console.log(`${err.code} ${err.hostname}`))

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})