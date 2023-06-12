// HERE WE ARE CREATING OUR WEATHER APP.
//these are the package we will use

//create var to pull from express
const express = require("express");

//var for express
const app = express();

//create variable for body-parser
const bodyParser = require("body-parser");

//create varibale for https
const https = require("https");

//NOW WE CREATE OUR ROUTE FOR URL TO PAGE.HTML
//first create a .USE
//usin url encoded to pull API through external uel
app.use(bodyParser.urlencoded({extended:true}));
//now we create a get to grab the page.html(send a request)
app.get("/", function(req,res){
// we want to grab the city name from html page
//do res to send file. inside the params pull from directoryname
// and add the page.html ( basically to get the response from the request)
res.sendFile(__dirname + "/page.html");
});

//now we will implement our API call to URL
//create a route to post
app.post("/", function (req,res){
// create variable for city name with a bodyparser request
const cityName = req.body.cityName; 
//create variable for URL
//added url value to be API key under current weather
const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=757a9446be85fa5cf7d269d5e39f1497`; //here we have the url set to {cityName} value bc whatever city name we will request
let latitude='';
let longitude='';
https.get(url, function(response) { // want server to GET-URL giving a response back
response.on("data", function(data){ //turn ON RESPONSE to listen for what we're asking
if (url.length === 0){ // IF no data is found in the url then
    res.write(`<p>Nothing found for ${cityName}</p>`); // WRITE our RESPONSE TO FRONT END using HTML tags
    res.send(); // here we are SENDING our RESPONSE
    return; // Once response sent, we return
}
const latlondata = JSON.parse(data)
console.log(latlondata)
latitude = latlondata[0].lat;
longitude = latlondata[0].lon;
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=757a9446be85fa5cf7d269d5e39f1497&units=imperial`;
//we want to get our url varibale that we just created.
//then we want the url to give a response.
https.get(weatherUrl, function (response){
    response.on("data", function(data){
//creating varibale to call on methods that we want      
const jsondata = JSON.parse(data);
const temp = jsondata.main.temp;
const des = jsondata.weather[0].description;
const icon = jsondata.weather[0].icon;
const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
res.write(`<p>The weather description is ${des} </p>`);
res.write("<img src=" + imageurl + ">");
        res.send();
    });
});
});
});




});

app.listen(9000);











