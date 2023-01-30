//required
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const { createBrotliCompress } = require('zlib')
const weather = require(__dirname + "/weather.js")
//server creation
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

//constants
const port = process.env.PORT || 3000
const APIKEY = require("./apikey.js").APIKEY
let dataObj = {
    weatherIcon : " ",
    temperature : "",
    description : "",
    humidity : "",
    pressure : "",
    windDeg : "",
    windSpeed : "" 
}
//server
//home route
app.get("/", async (req, res)=>{
    res.render("index", dataObj)
})

//city route
app.post("/city", async (req, res)=>{
    const cityName = req.body.cityInput
    try{
        dataObj = await weather.getWeatherCity(APIKEY, cityName)
    }
    catch(e){}
    finally{
        res.redirect("/")
    }
})

//latitude route
app.post("/lat", async (req, res)=>{
    const lat = req.body.latInput
    const lon = req.body.lonInput
    try{
        dataObj = await weather.getWeatherLat(APIKEY, lat, lon)
    }
    catch(e){}
    finally{
        res.redirect("/")
    }
})

app.listen(3000, ()=> console.log(`Server started at port ${port}`))
