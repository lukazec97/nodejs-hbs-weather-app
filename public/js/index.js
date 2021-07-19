const path = "http://localhost:3000/weather?address=";

const form = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector("#error");
const forecastInfo = document.querySelector("#forecast");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search?.value;
    
    errorMessage.textContent = 'Loading...';
    forecastInfo.textContent = '';

    fetch(path + location).then((response) => {
        response.json().then((weatherData) => {
            if (weatherData.error) {
                errorMessage.textContent = weatherData.error;
            } else {
                errorMessage.textContent = '';
                forecastInfo.textContent = `${weatherData.location}, forecast: ${weatherData.forecast}`;
            }
        });
    });


})
