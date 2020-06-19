const express = require('express');
const bodyParser = require('body-parser');
const https = require ('https');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})




app.post("/",function(req,res){
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=de0f2ace9dcbb5bc186d6c1c4c95b7ae&units=metric#"
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temperature in "+query+" city is "+temp+" and they are "+description+" </h1>")
            res.write("<img src="+iconUrl+">")
            res.send();

        })
    })
})








app.listen(3000,function(){
    console.log("Server 3000 is started");
})