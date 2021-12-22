console.log('Weather App');

const apiKey = `231210d949974765a23155553212212`;

// Grab every element with id of 1st card
let searchbtn = document.getElementById('searchbtn');
let iconDiv = document.getElementById('weatherImg');
let loc = document.getElementById('location');
let temperature = document.getElementById('temp');
let weatherStat = document.getElementById('weatherStat');
let Day = document.getElementById('day');
let feelsLike = document.getElementById('feelsLike');
let WeatherState = document.getElementById('WeatherState'); // For humidity, wind speed


// Grab every element with id of 2nd card
let searchbtn2 = document.getElementById('searchbtn2');
let iconDiv2 = document.getElementById('weatherImg2');
let loc2 = document.getElementById('location2');
let temperature2 = document.getElementById('temp2');
let weatherStat2 = document.getElementById('weatherStat2');
let Day2 = document.getElementById('day2');
let feelsLike2 = document.getElementById('feelsLike2');
let WeatherState2 = document.getElementById('WeatherState2'); // For humidity, wind speed


// Grab every element with id of 3rd card
let searchbtn3 = document.getElementById('searchbtn3');
let iconDiv3 = document.getElementById('weatherImg3');
let loc3 = document.getElementById('location3');
let temperature3 = document.getElementById('temp3');
let weatherStat3 = document.getElementById('weatherStat3');
let Day3 = document.getElementById('day3');
let feelsLike3 = document.getElementById('feelsLike3');
let WeatherState3 = document.getElementById('WeatherState3'); // For humidity, wind speed


function DayOfWeek(day) {
    let Day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return Day[day];
}

function updateClock(string) {
    // GEt current Date
    let time = new Date();
    let Day = `${time.getDate()}` + "-" + `${time.getMonth()}` + "-" + `${time.getFullYear()}`;
    let day = time.getDay();
    let dayOfWeek = DayOfWeek(day);
    let newdate = string.substring(11, 16);

    // Prepare the time string from hours, minutes and seconds
    let currentTimeString = `${Day} <br>${dayOfWeek}<br>  ${newdate}`;

    return currentTimeString;
}

function WeatherImage(text) {
    let wImg = {
        'Sunny': `<img  src="images/Icons/sunny.png" >`,
        'Mist': `<img src="images/Icons/mist.png" >`,
        'Cloudy': `<img src="images/Icons/cloudy.png" >`,
        'Partly cloudy': `<img src="images/Icons/sun_cloud.png" >`,
        'Rain': `<img src="images/Icons/rainy.png" >`,
        'Clear': `<img src="images/Icons/sunny.png" >`,
        'Light rain': `<img src="images/Icons/sun_cloud_rain.png" >`,
        'Heavy snow': `<img src="images/Icons/snow.png" >`,
        'Patchy rain possible': `<img src="images/Icons/rainy.png" >`,
        'Overcast': `<img src="images/Icons/overcast.png" >`,
        'Fog': `<img src="images/Icons/mist.png" >`,
        'Light rain shower': `<img src="images/Icons/light_rain.png" >`,
        'Patchy light rain with thunder': `<img src="images/Icons/rain_thunder.png" >`,
        'Patchy moderate snow': `<img src="images/Icons/snow.png" >`,
        'Heavy rain': `<img src="images/Icons/rainy.png" >`,
        'Moderate or heavy rain shower': `<img src="images/Icons/rainy.png" >`,
        'Moderate rain': `<img src="images/Icons/rainy.png" >`,
        'Light snow': `<img src="images/Icons/snow.png" >`,
    }

    let data = wImg[text];
    return data;
}

function OnWindowLoad(string1, string2, string3) {
    window.addEventListener('load', () => {
        function Data1() {

            let city1 = string1;
            const base1 = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city1}`;

            fetch(base1)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    DataInsertOnLoad(data);
                })
        }
        Data1();

        function Data2() {

            let city2 = string2;
            const base2 = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city2}`;

            fetch(base2)
                .then((response2) => {
                    return response2.json();
                })
                .then((data2) => {
                    DataInsertOnLoad2(data2);
                })
        }
        Data2();

        function Data3() {

            let city3 = string3;
            const base = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city3}`;

            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    DataInsertOnLoad3(data);
                })
        }
        Data3();
    })
}

let city1 = 'Udupi';
let city2 = 'Mangalore';
let city3 = 'Delhi';
OnWindowLoad(city1, city2, city3);

function DataInsertOnLoad(data) {
    let locData2 = data.location.name;
    let regData = data.location.region;
    let country = data.location.country;
    loc.innerHTML = `<p><i class="fa fa-map-marker"></i> ${locData2}, ${regData}, ${country}</p>`;

    let tempData = data.current.temp_c;
    temperature.innerHTML = `<p>${tempData}<span id = "celcius">°C</span></p>`;

    feelsLike.innerHTML = `Feels like ${data.current.feelslike_c}°C`;

    let weatherStatData = data.current.condition.text;
    weatherStat.innerHTML = `<p><strong>${weatherStatData}</strong></p>`;

    let date = data.location.localtime;
    let newDate = updateClock(date);
    Day.innerHTML = `<p>${newDate}</p>`;

    iconDiv.innerHTML = WeatherImage(weatherStatData);

    WeatherState.innerHTML = `<p id="wDataP">Humidity &nbsp&nbsp&nbsp Wind &nbsp&nbsp&nbsp Wind Dir <p id="wData">${data.current.humidity}   ${data.current.wind_kph}kph    ${data.current.wind_dir}</p></p>`;
}


searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let city = document.getElementById('searchbox1').value;
    const base = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            let locData = data.location.name;
            let regData = data.location.region;
            let country = data.location.country;
            if (regData == '') {
                regData = locData;
            }
            loc.innerHTML = `<p><i class="fa fa-map-marker"></i> ${locData}, ${regData}, ${country}</p>`;

            let tempData = data.current.temp_c;
            temperature.innerHTML = `<p>${tempData}<span id = "celcius">°C</span></p>`;

            feelsLike.innerHTML = `Feels like ${data.current.feelslike_c}°C`;

            let weatherStatData = data.current.condition.text;
            weatherStat.innerHTML = `<p><strong>${weatherStatData}</strong></p>`;

            let date = data.location.localtime;
            let newDate = updateClock(date);
            Day.innerHTML = `<p>${newDate}</p>`;

            iconDiv.innerHTML = WeatherImage(weatherStatData);
            WeatherState.innerHTML = `<p id="wDataP">Humidity &nbsp&nbsp&nbsp Wind &nbsp&nbsp&nbsp Wind Dir <p id="wData">${data.current.humidity}   ${data.current.wind_kph}kph    ${data.current.wind_dir}</p></p>`;
        })
})


// 2nd card

function DataInsertOnLoad2(data) {
    let locData2 = data.location.name;
    let regData2 = data.location.region;
    let country2 = data.location.country;
    if (regData2 == '') {
        regData2 = locData2;
    }
    loc2.innerHTML = `<p><i class="fa fa-map-marker"></i> ${locData2}, ${regData2}, ${country2}</p>`;

    let tempData = data.current.temp_c;
    temperature2.innerHTML = `<p>${tempData}<span id = "celcius">°C</span></p>`;
    feelsLike2.innerHTML = `Feels like ${data.current.feelslike_c}°C`;

    let weatherStatData = data.current.condition.text;
    weatherStat2.innerHTML = `<p><strong>${weatherStatData}</strong></p>`;

    let date = data.location.localtime;
    let newDate = updateClock(date);
    Day2.innerHTML = `<p>${newDate}</p>`;

    iconDiv2.innerHTML = WeatherImage(weatherStatData);

    WeatherState2.innerHTML = `<p id="wDataP">Humidity &nbsp&nbsp&nbsp Wind &nbsp&nbsp&nbsp Wind Dir <p id="wData">${data.current.humidity}   ${data.current.wind_kph}kph    ${data.current.wind_dir}</p></p>`;
}

searchbtn2.addEventListener('click', (e) => {
    e.preventDefault();
    let city = document.getElementById('searchbox2').value;
    const base = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let locData2 = data.location.name;
            let regData2 = data.location.region;
            let country2 = data.location.country;
            if (regData2 == '') {
                regData2 = locData2;
            }
            loc2.innerHTML = `<p><i class="fa fa-map-marker"></i> ${locData2}, ${regData2}, ${country2}</p>`;

            let tempData = data.current.temp_c;
            temperature2.innerHTML = `<p>${tempData}<span id = "celcius">°C</span></p>`;

            feelsLike2.innerHTML = `Feels like ${data.current.feelslike_c}°C`;

            let weatherStatData = data.current.condition.text;
            weatherStat2.innerHTML = `<p><strong>${weatherStatData}</strong></p>`;

            let date = data.location.localtime;
            let newDate = updateClock(date);
            Day2.innerHTML = `<p>${newDate}</p>`;

            iconDiv2.innerHTML = WeatherImage(weatherStatData);

            WeatherState2.innerHTML = `<p id="wDataP">Humidity &nbsp&nbsp&nbsp Wind &nbsp&nbsp&nbsp Wind Dir <p id="wData">${data.current.humidity}   ${data.current.wind_kph}kph    ${data.current.wind_dir}</p></p>`;

        })
})


// 3rd card

function DataInsertOnLoad3(data) {
    let locData3 = data.location.name;
    let regData3 = data.location.region;
    let country3 = data.location.country;
    if (regData3 == '') {
        regData3 = locData3;
    }
    loc3.innerHTML = `<p><i class="fa fa-map-marker"></i> ${locData3}, ${regData3}, ${country3}</p>`;

    let tempData = data.current.temp_c;
    temperature3.innerHTML = `<p>${tempData}<span id = "celcius">°C</span></p>`;

    feelsLike3.innerHTML = `Feels like ${data.current.feelslike_c}°C`;

    let weatherStatData = data.current.condition.text;
    weatherStat3.innerHTML = `<p><strong>${weatherStatData}</strong></p>`;

    let date = data.location.localtime;
    let newDate = updateClock(date);
    Day3.innerHTML = `<p>${newDate}</p>`;

    iconDiv3.innerHTML = WeatherImage(weatherStatData);

    WeatherState3.innerHTML = `<p id="wDataP">Humidity &nbsp&nbsp&nbsp Wind &nbsp&nbsp&nbsp Wind Dir <p id="wData">${data.current.humidity}   ${data.current.wind_kph}kph    ${data.current.wind_dir}</p></p>`;
}

searchbtn3.addEventListener('click', (e) => {
    e.preventDefault();
    let city = document.getElementById('searchbox3').value;
    const base = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let locData3 = data.location.name;
            let regData3 = data.location.region;
            let country3 = data.location.country;
            if (regData3 == '') {
                regData3 = locData3;
            }
            loc3.innerHTML = `<p><i class="fa fa-map-marker"></i> ${locData3}, ${regData3}, ${country3}</p>`;

            let tempData = data.current.temp_c;
            temperature3.innerHTML = `<p>${tempData}<span id = "celcius">°C</span></p>`;

            feelsLike3.innerHTML = `Feels like ${data.current.feelslike_c}°C`;

            let weatherStatData = data.current.condition.text;
            weatherStat3.innerHTML = `<p><strong>${weatherStatData}</strong></p>`;

            let date = data.location.localtime;
            let newDate = updateClock(date);
            Day3.innerHTML = `<p>${newDate}</p>`;

            iconDiv3.innerHTML = WeatherImage(weatherStatData);

            WeatherState3.innerHTML = `<p id="wDataP">Humidity &nbsp&nbsp&nbsp Wind &nbsp&nbsp&nbsp Wind Dir <p id="wData">${data.current.humidity}   ${data.current.wind_kph}kph    ${data.current.wind_dir}</p></p>`;

        })
})