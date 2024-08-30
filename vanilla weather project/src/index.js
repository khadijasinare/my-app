function displayResults(response){
    let location=document.querySelector("#city");
    let destination=document.querySelector("#country");
    let temperature=document.querySelector("#currently");
    let pressure =document.querySelector("#atmos");
    let speed=document.querySelector("#wind-value");
    let humidity=document.querySelector("#humidity-value");
    let currentTemperature=document.querySelector("#temperature-value");
    let icon=document.querySelector("#image");
    let description=document.querySelector("#description")
    



    location.innerHTML=response.data.city; 
    destination.innerHTML=response.data.country;
    temperature.innerHTML=Math.round(response.data.temperature.feels_like);
    pressure.innerHTML=response.data.temperature.pressure;
    speed.innerHTML=Math.round(response.data.wind.speed);
    humidity.innerHTML=response.data.temperature.humidity;
    currentTemperature.innerHTML=Math.round(response.data.temperature.current);
    icon.innerHTML=`<img src="${response.data.condition.icon_url}" class="image"/>`;
    description.innerHTML=response.data.condition.description;

    let date=new Date(response.data.time * 1000);
    let currentDate=document.querySelector("#current-date");
    let output=formatDate(date);
    currentDate.innerHTML=output;

    

    
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
    let month = date.getMonth();
    let dates=date.getDate();
    
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let months=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      
    ];
  
    let formattedDay = days[day];
    let formattedMonth=months[month];

    return `${formattedDay} ${formattedMonth} ${dates},  ${hours}:${minutes}`;

}

window.onload=function(){
    let input=localStorage.getItem("city")
    let apiKey = "fb831e3550b5189tafba62506o3f8334";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayResults);
  }


function formatDay(time){

  let days=[ 
    "Mon", 
    "Tue", 
    "Wed",
    "Fri",
    "Thu",
    "Sat",
    "Sun",
   
  ]
  let currentDay=new Date(time * 1000);
  return days[currentDay.getDay()];
  

}

function displayForecast(response){
  console.log(response.data);

  let forecastHtml ="";
  response.data.daily.forEach(function(day,index){
    if(index < 5){
    forecastHtml= forecastHtml + ` 
    <div class="forecast-info" id="forecast-info">
    <div class="day"><strong>${formatDay(day.time)}</strong></div>
    <div class="forecast-emoji" id="forecast-emoji"><img class="forecast-emoji" id="forecast-emoji" src="${day.condition.icon_url}"/></div>
    <div class="forecast-value" id="forecast-value-max"><span><strong>${Math.round(day.temperature.maximum)}°</strong></span><span class="forecast-value-min">${Math.round(day.temperature.minimum)}°</span></div>
   </div>`;
    }
  });

 let conditions=document.querySelector("#forecast-weather");
  conditions.innerHTML=forecastHtml;
  
  
}  
window.onload=function(){
  let inputValue=localStorage.getItem("city")
  let apiKey = "fb831e3550b5189tafba62506o3f8334";
  let currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${inputValue}&key=${apiKey}&units=metric`;
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${inputValue}&key=${apiKey}`;

    axios.get(currentWeatherUrl).then(displayResults);
    axios.get(forecastUrl).then(displayForecast);
}


