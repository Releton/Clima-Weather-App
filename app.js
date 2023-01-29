//required
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
//server creation
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

//constants
const port = process.env.PORT || 3000
const APIKEY = fs.readFileSync("./apikey.txt").toString()
const data = {
    weatherIcon : " http://openweathermap.org/img/wn/10d@2x.png",
    temperature : "30",
    description : "This is a description",
    humidity : "75%",
    pressure : "1077mbar",
    windDeg : "13deg",
    windSpeed : "69km/hr" 
}
//server
//home route
app.get("/", (req, res)=>{
    res.render("index", data)
})

app.listen(3000, ()=> console.log(`Server started at port ${port}`))