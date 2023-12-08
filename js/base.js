let lidgtMode = document.getElementById('light_mode');
let toggle = document.getElementById('directionToggle');
let cityH1 = document.getElementById('city_h1');
let darkMode = false;

let sunriseImg = document.getElementById('sunriseImg');
let sunsetImg = document.getElementById('sunsetImg');

let humidityImg = document.getElementById('humidityImg');
let pressureImg = document.getElementById('pressureImg');
let WindSpeedImg = document.getElementById('WindSpeedImg');
let uvImg = document.getElementById('uvImg');

toggle.onclick = () => {
    darkMode = !darkMode;
    lidgtMode.textContent = darkMode ? "Dark Mode" : "Light Mode";
    document.body.classList.toggle('dark-mode', darkMode);

    const body = document.body;

    if (darkMode) {
        body.style.background = "linear-gradient(to right, #393939, #1e1e1e)";
        searchBtn.innerHTML = '<img class="searchImg" src="img/searchDark2.png">';

        sunriseImg.src = 'img/SunriseDark.png';
        sunsetImg.src = 'img/SunsetDark.png';

        humidityImg.src = 'img/humidityDark.png';
        pressureImg.src = 'img/pressureDark.png';
        WindSpeedImg.src = 'img/Wind SpeedDark.png';
        uvImg.src = 'img/uvDark.png';
    } else {
        body.style.background = "linear-gradient(to right, #fff, #61686c)";
        searchBtn.innerHTML = '<img class="searchImg" src="img/search2.png">';

        sunriseImg.src = 'img/Sunrise.png';
        sunsetImg.src = 'img/Sunset.png';

        humidityImg.src = 'img/humidity.png';
        pressureImg.src = 'img/pressure.png';
        WindSpeedImg.src = 'img/Wind Speed.png';
        uvImg.src = 'img/uv.png';
    }
};

let btnLocation = document.getElementById('btnLocation');
let search = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');
let timesH1 = document.getElementById('times');
let searchForm = document.getElementById('weatherForm');
let currentTime = document.getElementById('currentTime');
let country = document.getElementById('country');
let dateW = document.getElementById('date');
let weatherDiv = document.getElementById('weather_div');

let imgF = document.getElementById('imgF');
let gradus = document.getElementById('gradus');
let dateD = document.getElementById('dateD');

let temp = document.getElementById('temp');
let feels = document.getElementById('feels');

let conditions = document.getElementById('conditions');
let conditionsImg = document.getElementById('conditionsImg');
let timeSunrise = document.getElementById('timeSunrise');
let timeSunset = document.getElementById('timeSunset');

let hPercentages = document.getElementById('hPercentages');
let pressureP = document.getElementById('pressureP');
let WindSpeedP = document.getElementById('WindSpeedP');
let uvP = document.getElementById('uvP');

let imgF_one = document.getElementById('imgF_one');
let imgF_two = document.getElementById('imgF_two');
let imgF_three = document.getElementById('imgF_three');
let imgF_four = document.getElementById('imgF_four');
let imgF_five = document.getElementById('imgF_five');

let date_one = document.getElementById('date_one');
let date_two = document.getElementById('date_two');
let date_three = document.getElementById('date_three');
let date_four = document.getElementById('date_four');
let date_five = document.getElementById('date_five');

let gradus_one = document.getElementById('gradus_one');
let gradus_two = document.getElementById('gradus_two');
let gradus_three = document.getElementById('gradus_three');
let gradus_four = document.getElementById('gradus_four');
let gradus_five = document.getElementById('gradus_five');

let dayGradys = document.getElementById('dayGradys');
let dayGradys_two = document.getElementById('dayGradys_two');
let dayGradys_three = document.getElementById('dayGradys_three');
let nightGradys_one = document.getElementById('nightGradys_one');
let nightGradys_two = document.getElementById('nightGradys_two');

let wind_km = document.getElementById('wind_km');

let dayWind_one = document.getElementById('dayWind_one');
let dayWind_two = document.getElementById('dayWind_two');
let dayWind_three = document.getElementById('dayWind_three');
let nightWind_one = document.getElementById('nightWind_one');
let nightWind_two = document.getElementById('nightWind_two');

let Dwind_km_one = document.getElementById('Dwind_km_one');
let Dwind_km_two = document.getElementById('Dwind_km_two');
let Dwind_km_three = document.getElementById('Dwind_km_three');
let Dwind_km_four = document.getElementById('Dwind_km_four');
let Dwind_km_five = document.getElementById('Dwind_km_five');

let dayImg_one = document.getElementById('dayImg_one');
let dayImg_two = document.getElementById('dayImg_two');
let dayImg_three = document.getElementById('dayImg_three');
let nightImg_one = document.getElementById('nightImg_one');
let nightImg_two = document.getElementById('nightImg_two');

function capitalizeFirstLetter(input) {
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}


searchBtn.onclick = () => {
    timeCity(search.value);
};

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = search.value;

    getTimeForCity(city);
});


async function getWeatherData(city) {
    const apiKey = '8b7cab1863ae4b3d83f185637231109';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function formatLocalTime(localTime) {
    const timeOnly = localTime.split(' ')[1];
    return timeOnly;
}

function presentDay(localTime) {
    const currentDate = new Date(localTime);
    const options = { weekday: 'long', day: 'numeric', month: 'short' };

    const day = currentDate.toLocaleDateString('en-US', { day: 'numeric' });
    const month = currentDate.toLocaleDateString('en-US', { month: 'short' });

    return currentDate.toLocaleDateString('en-US', options).replace(`${month} ${day}`, `${day} ${month}`);
}

function addDays(localTime, days) {
    const currentDate = new Date(localTime);
    const nextDayDate = new Date(currentDate);
    nextDayDate.setDate(currentDate.getDate() + days);

    const options = { weekday: 'long', day: 'numeric', month: 'short' };

    const day = nextDayDate.toLocaleDateString('en-US', { day: 'numeric' });
    const month = nextDayDate.toLocaleDateString('en-US', { month: 'short' });

    return nextDayDate.toLocaleDateString('en-US', options).replace(`${month} ${day}`, `${day} ${month}`);
}

async function updateUI(result) {
    updateLocationInfo(result);
    updateCurrentWeather(result);
    updateForecast(result);
}

function updateLocationInfo(result) {
    cityH1.innerHTML = search.value;
    const localTime = result.location.localtime;
    currentTime.innerHTML = formatLocalTime(localTime);
    dateW.innerHTML = presentDay(localTime);
}

function updateCurrentWeather(result) {
    temp.innerHTML = `${result.current.temp_c}°C`;
    feels.innerHTML = `Feels like: ${result.current.feelslike_c}°C`;
    conditions.innerHTML = result.forecast.forecastday[0].day.condition.text;
    timeSunrise.innerHTML = result.forecast.forecastday[0].astro.sunrise;
    timeSunset.innerHTML = result.forecast.forecastday[0].astro.sunset;
    hPercentages.innerHTML = result.current.humidity + '%';
    pressureP.innerHTML = result.current.pressure_mb + 'hPa';
    WindSpeedP.innerHTML = result.current.wind_mph + 'km/h';
    uvP.innerHTML = result.current.uv;

    const iconUrl = `https:${result.forecast.forecastday[0].day.condition.icon}`;
    conditionsImg.src = iconUrl;


    let apiResponse = result.current.temp_c;
    let feeal = result.current.feelslike_c;
    let gradus_o = result.forecast.forecastday[1].day.maxtemp_c;
    let gradus_t = result.forecast.forecastday[2].day.maxtemp_c;
    
    let dayG_o = result.forecast.forecastday[0].hour[13].temp_c;
    let dayG_tw = result.forecast.forecastday[0].hour[16].temp_c;
    let dayG_th = result.forecast.forecastday[0].hour[18].temp_c;
    let nightG_o = result.forecast.forecastday[0].hour[22].temp_c;
    let nightG_t = result.forecast.forecastday[1].hour[0].temp_c;
    
    
    const temperature = parseFloat(apiResponse,);
    const temperature_one = parseFloat(feeal);
    const temperature_two = parseFloat(gradus_o);
    const temperature_three = parseFloat(gradus_t);
    const temperature_four = parseFloat(dayG_o);
    const temperature_five = parseFloat(dayG_tw);
    const temperature_six = parseFloat(dayG_th);
    const temperature_seven = parseFloat(nightG_o);
    const temperature_eight = parseFloat(nightG_t);
    
    
    if (!isNaN(temperature, temperature_one)) {
    
      let Temperature = Math.floor(temperature);
      let TemperatureLike = Math.floor(temperature_one);
      let TemperatureGradys_one = Math.floor(temperature_two);
      let TemperatureGradys_two = Math.floor(temperature_three);
      let TemperatureDay_one = Math.floor(temperature_four);
      let TemperatureDay_two = Math.floor(temperature_five);
      let TemperatureDay_three = Math.floor(temperature_six);
      let TemperatureNight_one = Math.floor(temperature_seven);
      let TemperatureNight_two = Math.floor(temperature_eight);
    
      temp.innerHTML = `${Temperature}°C`;
      feels.innerHTML = `Feels like: ${TemperatureLike}°C`;
      gradus_one.innerHTML = `${TemperatureGradys_one}°C`;
      gradus_two.innerHTML = `${TemperatureGradys_two}°C`;
    
      dayGradys.innerHTML =  `${TemperatureDay_one}°C`;
      dayGradys_two.innerHTML =  `${TemperatureDay_two}°C`;
      dayGradys_three.innerHTML = `${TemperatureDay_three}°C`;
      nightGradys_one.innerHTML = `${TemperatureNight_one}°C`;
      nightGradys_two.innerHTML = `${TemperatureNight_two}°C`;
    } else {
      console.log("Не вдалося отримати температуру з API-відповіді");
    }
    


    function updateWindImage(windDir, imgElement) {
        switch (windDir) {
            case "N":
                imgElement.src = 'img/wind/N.png';
                break;
    
            case "NNE":
                imgElement.src = 'img/wind/NNE.png';
                break;
    
            case "NE":
                imgElement.src = 'img/wind/NE.png';
                break;
            case "ENE":
                imgElement.src = 'img/wind/ENE.png';
                break;
    
            case "E":
                imgElement.src = 'img/wind/E.png';
                break;
            case "ESE":
                imgElement.src = 'img/wind/ESE.png';
                break;
            case "SE":
                imgElement.src = 'img/wind/SE.png';
                break;

            case "SSE":
                imgElement.src = 'img/wind/SSE.png';
                break;
    
            case "S":
                imgElement.src = 'img/wind/S.png';
                break;
    
            case "SSW":
                imgElement.src = 'img/wind/SSW.png';
                break;
            case "SW":
                imgElement.src = 'img/wind/SW.png';
                break;
            case "WSW":
                imgElement.src = 'img/wind/WSW.png';
                break;
    
            case "W":
                imgElement.src = 'img/wind/W.png';
                break;
            case "WNW":
                imgElement.src = 'img/wind/WNW.png';
                break;
    
            case "NW":
                imgElement.src = 'img/wind/NW.png';
                break;
            case "NNW":
                imgElement.src = 'img/wind/NNW.png';
                break;
    
            default:
                break;
        }
    }
    
    updateWindImage(result.forecast.forecastday[0].hour[13].wind_dir, dayWind_one);
    updateWindImage(result.forecast.forecastday[0].hour[16].wind_dir, dayWind_two);
    updateWindImage(result.forecast.forecastday[0].hour[18].wind_dir, dayWind_three);
    updateWindImage(result.forecast.forecastday[0].hour[21].wind_dir, nightWind_one);
    updateWindImage(result.forecast.forecastday[1].hour[0].wind_dir, nightWind_two);

    Dwind_km_one.innerHTML = result.forecast.forecastday[0].hour[13].wind_kph + 'km/h';
    Dwind_km_two.innerHTML = result.forecast.forecastday[0].hour[16].wind_kph + 'km/h';
    Dwind_km_three.innerHTML = result.forecast.forecastday[0].hour[18].wind_kph + 'km/h';
    Dwind_km_four.innerHTML = result.forecast.forecastday[0].hour[22].wind_kph + 'km/h';
    Dwind_km_five.innerHTML = result.forecast.forecastday[1].hour[0].wind_kph + 'km/h';    

    // dayImg_one.src = result.forecast.forecastday[0].hour[13].
    updateForecastImage('dayImg_one', result.forecast.forecastday[0].hour[13].condition.icon);
    updateForecastImage('dayImg_two', result.forecast.forecastday[0].hour[16].condition.icon);
    updateForecastImage('dayImg_three', result.forecast.forecastday[0].hour[18].condition.icon);
    updateForecastImage('nightImg_one', result.forecast.forecastday[0].hour[22].condition.icon);
    updateForecastImage('nightImg_two', result.forecast.forecastday[1].hour[0].condition.icon);

};

function updateForecast(result) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
      }
      
      // Елемент img
      var imgF_three = document.getElementById('imgF_three');
      
      var randomNum = getRandomInt(1, 5);
      var randomNum_one = getRandomInt(1, 2);
      var randomNum_two = getRandomInt(1, 4);
      var randomNum_gradyse = getRandomInt(1, 10);
      
      if (randomNum === 1) {
        imgF_three.src = 'img/SnowWind.png';
      }
      if (randomNum === 2) {
        imgF_three.src = 'img/Partly cloudy.png';
      }
      if (randomNum === 3) {
        imgF_three.src = 'img/SnowWind.png';
      }
      if (randomNum === 4) {
        imgF_three.src = 'img/sun_with_rain.png';
      }
      if (randomNum === 5) {
        imgF_three.src = 'img/Sunny.png';
      }

      if (randomNum_one === 1) {
        imgF_four.src = 'img/SnowWind.png';
      }
      if (randomNum_one === 2) {
        imgF_four.src = 'img/Partly cloudy.png';
      }
      if (randomNum_one === 3) {
        imgF_four.src = 'img/SnowWind.png';
      }
      if (randomNum_one === 4) {
        imgF_four.src = 'img/sun_with_rain.png';
      }
      if (randomNum_one === 5) {
        imgF_four.src = 'img/Sunny.png';
      }

      if (randomNum_two === 1) {
        imgF_five.src = 'img/SnowWind.png';
      }
      if (randomNum_two === 2) {
        imgF_five.src = 'img/Partly cloudy.png';
      }
      if (randomNum_two === 3) {
        imgF_five.src = 'img/SnowWind.png';
      }
      if (randomNum_two === 4) {
        imgF_five.src = 'img/sun_with_rain.png';
      }
      if (randomNum_two === 5) {
        imgF_five.src = 'img/Sunny.png';
      }


      if (gradus_one.innerHTML > 0) {
        gradus_three.innerHTML = '-' + randomNum;
      }

      gradus_three.innerHTML = `${randomNum_gradyse}°C`;
      gradus_four.innerHTML = `${randomNum_one}°C`;
      gradus_five.innerHTML = `${randomNum_two}°C`;

    console.log(result);
    const localTime = result.location.localtime;
    updateForecastImage('imgF_one', result.forecast.forecastday[1].day.condition.icon);
    date_one.innerHTML = addDays(localTime, 1);        
    updateForecastImage('imgF_two', result.forecast.forecastday[2].day.condition.icon);
    date_two.innerHTML = addDays(localTime, 2);
    date_three.innerHTML = addDays(localTime, 3);
    date_four.innerHTML = addDays(localTime, 4);
    date_five.innerHTML = addDays(localTime, 5);
    updateForecastImage('imgF_three', result.forecast.forecastday[3].day.condition.icon);
    gradus_three.innerHTML = result.forecast.forecastday[3].day.maxtemp_c + '°C';

    gradus_four.innerHTML = result.forecast.forecastday[4].day.maxtemp_c + '°C';
    };

function updateForecastImage(imgId, iconPath) {
    const imgElement = document.getElementById(imgId);
    if (imgElement && iconPath) {
        const iconUrl = `https:${iconPath.replace(/^\/\//, '')}`;
        imgElement.src = iconUrl;
    }
}

async function timeCity(city) {
    try {
        const result = await getWeatherData(city);
        updateUI(result);
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

darkMode = localStorage.getItem('darkMode') === 'true';

lidgtMode.textContent = darkMode ? "Dark Mode" : "Light Mode";
document.body.classList.toggle('dark-mode', darkMode);

const body = document.body;

if (darkMode) {
    body.style.background = "linear-gradient(to right, #393939, #1e1e1e)";
    searchBtn.innerHTML = '<img class="searchImg" src="img/searchDark2.png">';
    sunriseImg.src = 'img/SunriseDark.png';
    sunsetImg.src = 'img/SunsetDark.png';
} else {
    body.style.background = "linear-gradient(to right, #fff, #61686c)";
    searchBtn.innerHTML = '<img class="searchImg" src="img/search2.png">';
    sunriseImg.src = 'img/Sunrise.png';
    sunsetImg.src = 'img/Sunset.png';
}

toggle.checked = localStorage.getItem('toggleState') === 'true';

toggle.addEventListener('change', () => {
    darkMode = toggle.checked;
    lidgtMode.textContent = darkMode ? "Dark Mode" : "Light Mode";
    document.body.classList.toggle('dark-mode', darkMode);

    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('toggleState', toggle.checked);

    const body = document.body;

    if (darkMode) {
        body.style.background = "linear-gradient(to right, #393939, #1e1e1e)";
        searchBtn.innerHTML = '<img class="searchImg" src="img/searchDark2.png">';
        sunriseImg.src = 'img/SunriseDark.png';
        sunsetImg.src = 'img/SunsetDark.png';
    } else {
        body.style.background = "linear-gradient(to right, #fff, #61686c)";
        searchBtn.innerHTML = '<img class="searchImg" src="img/search2.png">';
        sunriseImg.src = 'img/Sunrise.png';
        sunsetImg.src = 'img/Sunset.png';
    }
});