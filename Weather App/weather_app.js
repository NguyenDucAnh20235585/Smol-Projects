const weather_form = document.querySelector(".weather_form");

const city_input = document.querySelector(".city_input");

const card = document.querySelector(".card");

const api_key = "98d8323f0460b206dadda94bf4ae3c5f";

weather_form.addEventListener("submit", async event => {

    event.preventDefault();

    const city = city_input.value;

    if(city){
        try{
            const weather_data = await get_weather_data(city);
            display_weather_info(weather_data);
        }
        catch(error){
            console.error(error);
            display_error(error);
        }
    }
    else{

        display_error("Human. Enter a city/province");

    }
});

async function get_weather_data(city){
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const response = await fetch(api_url);

    console.log(response);

    if(!response.ok){
        throw new Error("Are you making a city? Don't fool me, human.");
    }

    return await response.json();
}

function display_weather_info(data){

    const { name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const city_display = document.createElement("h1");
    const temp_display = document.createElement("p");
    const humidity_display = document.createElement("p");
    const description_display = document.createElement("p");
    const weather_emoji = document.createElement("p");

    city_display.textContent = city;
    temp_display.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidity_display.textContent = `Humidity: ${humidity}%`;
    description_display.textContent = description;
    weather_emoji.textContent = get_weather_emoji(id);

    city_display.classList.add("city_display");
    temp_display.classList.add("temp_display");
    humidity_display.classList.add("humidity_display");
    description_display.classList.add("description_display");
    weather_emoji.classList.add(`weather_emoji`);

    card.appendChild(city_display);
    card.appendChild(temp_display);
    card.appendChild(humidity_display);
    card.appendChild(description_display);
    card.appendChild(weather_emoji);
}

function get_weather_emoji(weather_id){
    
    switch(true){
        case (weather_id >= 200 && weather_id < 300):
            return "⛈️";

        case (weather_id >= 300 && weather_id < 500):
            return "☔";

        case (weather_id >= 500 && weather_id < 600):
            return "🌧️";

        case (weather_id >= 600 && weather_id < 700):
            return "☃️";

        case (weather_id >= 700 && weather_id < 800):
            return "🌫️";

        case (weather_id == 800):
            return "☀️";

        case (weather_id > 800 && weather_id < 810):
            return "☁️";
        
        default:
            return "🤷‍♀️";
    }
}

function display_error(message){

    const error_display = document.createElement("p");

    error_display.textContent = message;

    error_display.classList.add("error_display");

    card.textContent = "";

    card.style.display = "flex";

    card.appendChild(error_display);
}
