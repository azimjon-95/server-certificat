const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const loginRoute = require("./routes/loginroute");
const certificate = require('./routes/certificate');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

async function serverFunc() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

serverFunc();

app.use('/user', userRoutes);
app.use('/auth', loginRoute);
app.use("/certificate", certificate);

app.get('/', (req, res) => {
    res.send("Welcome to our API");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
