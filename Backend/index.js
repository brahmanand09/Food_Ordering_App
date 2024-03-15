const express = require('express')
const app =express()
const port =5000
const mongoDB = require('./db')

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept"
    );
    next();
})

mongoDB();
app.get('/',(req,res)=>{
    res.send("Hello")
})
app.use(express.json())
app.use('/api' , require("./Routes/Createuser"))
app.use('/api' , require("./Routes/displayData"))
app.use('/api' , require("./Routes/OrderData"))
app.listen(port,()=>{
    console.log(`Example ${port}`)
})