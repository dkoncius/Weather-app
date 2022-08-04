"use strict";

var apikey1 = "3265874a2c77ae4a04bb96236a642d2f";
var apikey2 = "bc12083e70d2d22298c2df1cec7101d9";
var form = document.getElementById("form");
var search = document.getElementById("search");
var main = document.getElementById("main");

async function fetchUrl(city){
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey2}`);
}

async function fetchCity(city){
      var response = await fetchUrl(search.value);
      var data = await response.json();
      try {
        appendData(data);
      } catch(e){
         alert("Tokio miesto neradome, pamėginkite kitą");
            console.log(e);
      }
}

function appendData(data){
    var weather = document.createElement("div");
    var icon = data.weather[0].icon;
    var temp = data.main.temp - 273.25;
    temp = Math.floor(temp);
    weather.classList.add("weather");
    weather.innerHTML =
    `
      <div class="weather">
            <h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
                ${temp}°C
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
            </h2>
        </div>
    `
        // Clear data
    main.innerHTML = "";
    search.value = "";
   
    // Append data
    main.append(weather);

    console.log(data);
}


form.addEventListener("submit", function(e){
    e.preventDefault();

    if(search.value){
      fetchCity(search.value);
    } else {
        alert("Įveskite miestą");
    }
})
