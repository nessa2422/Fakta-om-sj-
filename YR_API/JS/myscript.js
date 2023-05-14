let weather = {
    "apiKey": "f6da5dd2167fce80fb0432caf8608008",
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather [0];
        const {temp, humidity } = data.main;
        const {speed} = data.wind;
        document.querySelector(".by").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".beskrivelse").innerText = description;
        document.querySelector(".temperatur").innerText = temp + "°C";
        document.querySelector(".fukt").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".vind").innerText = "Windspeed: " + speed + "km/t";
        document.querySelector(".weather").classList.remove("loading");
        //Gjøre bakgrunn slik at den henter bilder fra unsplash med som er tagget med byen
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ")"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};


document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("");
