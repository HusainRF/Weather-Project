const express = require("express");
const https = require("https");

const app = express();

app.get("/" , function(req , res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=bf8d944a3fcc1c204fd12326cd3c0099&units=metric";
    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/" + icon +"@2x.png"; 
            console.log(icon);

            res.write( "<p>The weather is currently " + description + "/p");
            res.write("<h1> The temperature in Indore is " + temp + " degree Celcius </h1>");
            res.write("<img src=" + imageURL +">")
            res.send();
        });
    });
});





app.listen(3000 , function(){
    console.log("The server is running on port 3000.");
});