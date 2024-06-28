import express from 'express'
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Routes from './routes/route.js'
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5000

dotenv.config();
app.use(cors())
app.use(express.static(join(__dirname, "public", "app")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }))


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