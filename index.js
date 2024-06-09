const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user")
const LoginRoute = require("./routes/loginroute")
require('dotenv/config');
const cors = require("cors");
const certificate = require('./routes/certificate');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

async function serverFunc() {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res => console.log("muvaffiqiyatli"))
        .catch(error => console.log("serverda error"))
}
serverFunc()



app.use('/user', userRoutes)
app.use('/auth', LoginRoute)
app.use("/certificate", certificate);
// app get
app.get('/', (req, res) => {
    res.send("Welcome to our API");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server ${port}da eshitilmoqda... `)
});