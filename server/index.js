const express =require("express");
const app =express()

app.use('/',(req,res)=>{
    res.send("server is going mad running")
})
app.listen(5000,console.log("Server has started"))