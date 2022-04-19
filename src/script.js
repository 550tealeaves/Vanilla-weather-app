function formatDate(timestamp){ //timestamp is the # of milliseconds since 1/19/70
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [ //create array so that name of day shows instead of index
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()]; //set day = array[function.getDay()];

    
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){ //STEP 58 - create new format to edit forecast date & send it timestamp - add formatDay to interpolated forecastDay.dt
    let date = new Date(timestamp * 1000); //STEP 59 - converting timestamp
    let day = date.getDay(); //STEP 60 - must create array so that day return is words and not numbers
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //STEP 61 create array 
    
    return days[day]; //STEP 62 - this will convert the long time number to shortened days
}

function displayForecast(response){ //STEP 39 - create displayForecast function  & paste HTML forecast code between backticks ``;] - STEP 54 add response as parameter
    console.log(response.data.daily);
    let forecast = response.data.daily; //STEP 55 - shows daily forecast STEP 56 - store response.data.daily in variable, forecast
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`; //STEP 41 - set variable forecastHTML = to empty string  - move HTML code into forecastHTML - STEP 43 - move <div class="row"> withn backticks
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"]; //STEP 45 - create array to loop forecast HTML
    forecast.forEach(function(forecastDay, index){ //STEP 46 - use foreEach so loop repeats and insert the forecastHTML=forecastHTML+... b/w brackets //STEP 57 - change start of loop and function from days to forecast & forecastDay //STEP 63 - add 2nd paramter, index
    if (index < 6){ //STEP 64 - will display only indexes 0-5 and hide 6+
        forecastHTML = forecastHTML + `  
                    
                        <div class="col-2">
                            <div class="weather-forecast-date">
                                ${formatDay(forecastDay.dt)}
                            </div>
                            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
                            <div class="weather-forecast-temperatures">
                                <span class="weather-forecast-temperature-max ms-1">
                                    ${Math.round(forecastDay.temp.max)}</span>
                                <span class="weather-forecast-temperature-min ms-1">
                                    ${Math.round(forecastDay.temp.min)}</span>
                            </div>
                        </div>
                `;
        }        
    })
      
    forecastHTML = forecastHTML + `</div>`; //STEP 44 - remember to close the div
    forecastElement.innerHTML = forecastHTML; //STEP 42 - set the HTML code = to forecastHTML
}

function getForecast(coordinates){ //STEP 48 - create function getForecast to receive coordinates, sent from displayTemp(response), which returns city coords 
    console.log(coordinates);
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b"; //STEP 50 - copy/paste apiKey statement from step 1
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`; ////STEP 49 - add apiUrl, remove &exclude{part}, interpolate apiKey & coordinates.lat/lon & add units=metric
    axios.get(apiUrl).then (displayForecast); //STEP 53 - make API call and trigger displayForecast function
}


function displayTemperature(response) { //Step 4 - create function that activates when we get response from api
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon"); //Step 7 - target icon to change along w/ weather description

    celsiusTemperature = response.data.main.temp; //STEP 27 - set celsiusTemperature variable = to path w/ Celsius temp in API

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name; //this is where city name is shown in object 
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000); //Step 5 - send timestamp (inside response.data.dt *1000) to formatDate function so it is reflects in innerHTML
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); //Step 8 - use setAttribute() function to inject icon link into src
    iconElement.setAttribute("alt", response.data.weather[0].description); //Step 9 - set alt equal to description so that shows in console element


    getForecast(response.data.coord); //STEP 47 - call getForecast and send the response.data.coord
}

function search(city) { //STEP 16 - create function search (above function handleSubmit and add city parameter) - then move the apiKey, apiUrl, & axios.get() variables under it and delete city variable 
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b"; //step 1 add ApiKey and URL
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  //step 2 add apiUrl
    axios.get(apiUrl).then(displayTemperature); //step 3 - add axios.get
}

function searchLocation(position) {
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) { //STEP 12 - create function handleSubmit to modify value placed in search bar
    event.preventDefault(); //STEP 13 - stop pg from reloading when you submit
    let cityInputElement = document.querySelector("#city-input"); //STEP 14 - select form w/ id "city-input"
    search(cityInputElement.value); //STEP 18 - replace console.log w/ this so that submission on search bar triggers API call to gather data and produce weather for city name entered 
}


function displayFahrenheitTemp(event) { //STEP 21 - create function displayFahrenheitTemp that will receive event parameter
    event.preventDefault(); //STEP 22 - stop link from reloading pg 
    let temperatureElement = document.querySelector("#temperature"); //STEP 23 - select the element w/ temperature id (big temp numbers to change it)
    celsiusLink.classList.remove("active"); //STEP 35 - when click F, it will turn the C active
    fahrenheitLink.classList.add("active"); //STEP 36 - removes F active link and then adds to C 
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32; //STEP 24/28 - set new variable fahrenheitTemperature = to celsiustemp * conversion formula (stops formula from repeating) 
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature); //STEP 25 - set change the HTML (big temp numbers) to be equal to fahrenheit value after clicking F-link
}


function displayCelsiusTemp(event) { //STEP 31 - create function displayCelsisuTemp that will receive event parameter
    event.preventDefault(); //STEP 32 - stop pg reloading 
    celsiusLink.classList.add("active"); //STEP 37 - when click the active C, it will switch to F and inactive C
    fahrenheitLink.classList.remove("active"); //STEP 38 - inactiveates C and makes F active 
    let temperatureElement = document.querySelector("#temperature"); //STEP 33 - select temperature element 
    temperatureElement.innerHTML = Math.round(celsiusTemperature); //STEP 34 - already know C temp (response.data.main.temp), set tempEle.inner = celsiusTemp to keep track of temp
}

let celsiusTemperature = null; //STEP 26 - create global variable outside function that can be used w/in a function too 

let formElement = document.querySelector("#search-form"); //STEP 10 - select form to modify
formElement.addEventListener("submit", handleSubmit); //STEP 11 - addEventListener to trigger function search() upon submission

let fahrenheitLink = document.querySelector("#fahrenheit-link"); //STEP 19 - select link element w/ id="fahrenheit-link" 
fahrenheitLink.addEventListener("click", displayFahrenheitTemp); //STEP 20 - add eventListener on the click of the fahrenheit-link that triggers function displayFahrenheitTemp

let celsiusLink = document.querySelector("#celsius-link"); //STEP 29 - select id="celsius=link"
celsiusLink.addEventListener("click", displayCelsiusTemp); //STEP 30 - add eventListener that triggers function displayCelsiusTemp when you click Celsius link

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("New York"); //STEP 17 after #16, form will be blank, have to pass city name through search function

