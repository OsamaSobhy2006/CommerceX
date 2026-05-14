const express = require('express')
const app = require('./app')
const connectDB =  require('./config/connectDB.js')
const {setServers} = require('node:dns/promises')

setServers(["8.8.4.4", "8.8.8.8"])


connectDB();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`)
})