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
}

function search(city) { //STEP 16 - create function search (above function handleSubmit and add city parameter) - then move the apiKey, apiUrl, & axios.get() variables under it and delete city variable 
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b"; //step 1 add ApiKey and URL
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  //step 2 add apiUrl
    axios.get(apiUrl).then(displayTemperature); //step 3 - add axios.get
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

search("New York"); //STEP 17 after #16, form will be blank, have to pass city name through search function