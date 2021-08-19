const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = "http://api.weatherapi.com/v1/forecast.json?key=a931b521c85b4d41b5d110946210308&q=" + latitude +"," +longitude + "&days=1&aqi=no&alerts=no"

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to the Weather Services",undefined)
        }
        else if(body.error){
            callback("Unable to find location")
        }

        else{
            
            callback(undefined,"It is currently "+ body['current']['temp_c'] + " degrees out. The humidity is "+body['current']['humidity'] +".There is a "+ body['current']['precip_mm']+"% chance of rain.")
        }
    })
   
}

module.exports = forecast