const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const conditionOutput=document.querySelector('.condition');
const nameOutput=document.querySelector('.name');
const icon=document.querySelector('.icon');
const cloudOutput=document.querySelector('.cloud');
const humidityOutput=document.querySelector('.humidity');
const windOutput=document.querySelector('.wind');
const form=document.getElementById('locationInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');


//default city when the page loads
let cityname="London";



//Add click event to each city in the panel
cities.forEach((city)=>{
city.addEventListener('click',(e) => {

//change from default city to the clicked one 
cityname=e.target.innerHTML;

/*Function that fetches and displays all the data from the weather API(we will write it soon)*/
fetchWeatherData();

//fade out the app(simple animation)
app.style.opacity="0";
});
})




//Add subit event to the form
form?.addEventListener('submit',(e) =>
{
  e.preventDefault()
/*if the input field(search bar) is empty,throw an alert*/
 if(search.value.length == 0 ){
    alert("please type in a city name");
}
else{
/*change from default city to the one written in the input field*/
cityname=search.value;
/*Function that fetches and displays all the data from the weather API(we see)*/
fetchWeatherData();
//remove all text from the input feild
search.value="";
//Fade out the app(simple animation)
app.style.opacity="0";
}
//prevents the default behavior of the form
e.preventDefault();
});


/*Function that returns a day of the week (monday,tuesday,friday....)from a date(12 03 2023)(we see in function later*/
function dayOfTheWeek(day ,month ,year){
const weekday=[
"Sunday",
"Monday",
"Tueday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
var d=new Date(day,month,year)
var dayName=weekday[d.getDay()];
return dayName;

};


/*Function that fetching and displays the data from the weather API*/
function fetchWeatherData(){

/*fetch the data and dynamically add the city name with templets literals*/
/*USE YOUR OWN KEY*/
fetch("https://api.weatherapi.com/v1/current.json?key=c2a63b00859b458ba8a00401232611&q=" + cityname + "=&aqi=no")


/*Take the datab |(which is in json format))and convert6 it to a regular js object*/
.then(response =>response.json())
.then(data => {
/*you console log the data to see what  is available*/
console.log(data);


/*lets start by adding the temperature and weather condition to the page*/
temp.innerHTML=data.current.temp_c+"&#176;";
conditionOutput.innerHTML=data.current.condition.text;

/*get the dataand time from the city and extract the day ,month,year and time into individual variables*/
const date=data.location.localtime;
const y=parseInt(date.substr(0,4));
const m=parseInt(date.substr(5,2));
const d=parseInt(date.substr(8,2));//        "localtime": "2023-11-26 17:09"
const time=date.substr(11,5);


dateOutput.innerHTML=dayOfTheWeek(d,m,y)+" "+ d +" "+ m + " "+ y ;
timeOutput.innerHTML=time;

nameOutput.innerHTML=data.location.name;


const iconId=data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);   

/*Reformat the data into something more appealing and add it to the page*/
icon.src="C:/Users/Deepa/Desktop/wheatherproject/icons/"+iconId;

//add the weather details to the page 
cloudOutput.innerHTML=data.current.cloud+"%";
humidityOutput.innerHTML=data.current.humidity+"%";
windOutput.innerHTML=data.current.wind_kph+"km/h";

//set default time of day
let timeOfDay="day";
//get the unique id for each weather condition 
const code=data.current.condition.code;
//change to night if its night time in the city
if(!data.current.is_day){
timeOfDay="night";
}


if(code==1000){
/*set the background image to clear if the weather is clear*/
app.style.backgroundImage = "url('C:/Users/Deepa/Desktop/wheatherproject/images/"+timeOfDay+"/clear.jpg')";
/*change the button bg color depending on if its day or night*/
btn.style.background="#e5ba92";
if(timeOfDay=="night"){
   btn.style.background="#181e27";
  }
}
/*same thing for cloudy weather*/
else if(
code==1003||                                     
code==1006||                                     
code==1009||                                     
code==1030||                                     
code==1069||                                     
code==1087||                                     
code==1135||                                     
code==1273||                                     
code==1276||                                     
code==1279||                                     
code==1282)
{ 
app.style.backgroundImage="url('C:/Users/Deepa/Desktop/wheatherproject/images/"+timeOfDay+"/cloudy.jpg')";
btn.style.background = "#fa6dlb";
if(timeOfDay=="night"){
btn.style.background="#181e27";
}
/*ANd rain*/
}else if(
code==1063||
code==1069||
code==1072||
code==1150||
code==1153||
code==1180||
code==1183||
code==1186||
code==1189||
code==1192||
code==1195||
code==1240||
code==1243||
code==1246||
code==1249||
code==1252 )
{
app.style.backgroundImage="url('C:/Users/Deepa/Desktop/wheatherproject/images/"+timeOfDay+"/rainy.jpg')";
btn.style.background="#647d75";
if(timeOfDay=="night"){
btn.style.background="#325c80";
}
/*and finally ....snow*/
}else{
app.style.backgroundImage="url('C:/Users/Deepa/Desktop/wheatherproject/images/${timeOfDay}/snowy.jpg')";
btn.style.background="#4d72aa";
if(timeOfDay=="night"){
btn.style.background="#1b1b1b";
}
}
//fade in the page once all is done 
app.style.opacity="1";
})
/*if the user types a city that doesn't exist , then trow an alert*/
.catch(()=>{
alert('City not found ,please try again');
app.style.opacity="1";
});

}
//call the function  on the page load
fetchWeatherData();
//fade in the page
app.style.opacity="1";

