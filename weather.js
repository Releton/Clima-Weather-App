const axios = require('axios').default
//constants
const dataObj = {
    weatherIcon : " ",
    temperature : "",
    description : "",
    humidity : "",
    pressure : "",
    windDeg : "",
    windSpeed : "",
    cityName: "" 
}
exports.getWeatherCity = async (APIKEY, cityName)=>{
    return new Promise((resolve, reject)=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&q=${cityName}&units=metric`)
        .then( response =>{
            const r = response.data
            setData(`http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`, `${r.main.temp}°C`,`${r.weather[0].description}`
            ,`${r.main.humidity}%`,`${r.main.pressure}mbar`,`${r.wind.deg}°`,`${r.wind.speed}Miles/hr`,cityName)
            resolve(dataObj)
            return
        })
        .catch(()=>{
            reject(new Error("GetRequestFailed"))
        }
        )
    })
}

exports.getWeatherLat = async (APIKEY, lat, lon)=>{
    return new Promise((resolve, reject)=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&lat=${lat}&units=metric&lon=${lon}`)
        .then(response =>{
            const r = response.data
            setData(`http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`, `${r.main.temp}°C`,`${r.weather[0].description}`,`${r.main.humidity}%`,`${r.main.pressure}mbar`,`${r.wind.deg}°`,`${r.wind.speed}Miles/hr`,`${lat.slice(0,4)} ${lon.slice(0,4)}`)
            resolve(dataObj)
        })
    })
}
//functions
function setData(weatherIcon, temperature, description, humidity, pressure, windDeg, windSpeed, cityName){
    dataObj.weatherIcon =  weatherIcon
    dataObj.temperature = temperature
    dataObj.description = description
    dataObj.humidity = humidity
    dataObj.pressure = pressure
    dataObj.windDeg = windDeg
    dataObj.windSpeed = windSpeed
    dataObj.cityName = cityName
}