const api = {
    key: "47b9d075fa211eab3ac8711d88cf507d",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt-br",
    units: "metric"
}


const city = document.querySelector('.cidade');
const date = document.querySelector('.date');
const container_img = document.querySelector('.container-img');
const container_temp = document.querySelector('.container-temp');
const temp_number = document.querySelector('.container-temp div');
const temp_unit = document.querySelector('.container-temp span');
const weather_t = document.querySelector('.weather');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
const low = document.querySelector('low');

search_button.addEventListener('click', function () {
    searchResults(search_input.value);
    alert("ok");
})

function searchResults(city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {


            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }

            return response.json();
        })
        .catch(error => {
            alert(error.message);

        })
        .then(response => {
            displayResults(response);
        });

}
function displayResults(weather) {

    console.log(weather);
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    date.innerText = dateBuilder(now);
    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src = "./icons/${iconName}.png>"`;
    let temperature = `${Math.round(weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `ºc`;
    weather_tempo = weather.weather[0].description;
    weather_t.innerText = capitalizeFirstLetter(weather_tempo)
    low.innerText = `${Math.round(weather.main.temp_min)}ºc / ${Math.round(weather.main.temp_max)}ºc`;
}

function dateBuilder(d) { 
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
   
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;


}

container_temp.addEventListener('click', changeTemp) 
function changeTemp() { 
    temp_number_now = temp_number.innerHTML

    if (temp_unit.innerHTML === "ºc") {
        let f = (temp_number_now *1.8) + 32
        temp_unit.innerHTML= "ºf"
        temp_number.innerHTML = Math.round(f)
    } else { 
        let c = (temp_number_now - 32) / 1.8
        temp_unit.innerHTML = "ºc"
        temp_number.innerHTML = Math.round(c)
    }
}
    function capitalizeFirstLetter(string) { 
        return string.charAt(0).toUpperCase() + string.slice(1);
    
        
}