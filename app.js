const express = require("express");
require("dotenv").config();

PORT = process.env.PORT
const app = express()

app.listen(PORT, (req, res) =>{
    console.log(`server is running on ${PORT}`)
}) 
