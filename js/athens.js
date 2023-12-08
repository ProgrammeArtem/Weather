// ...
document.addEventListener('DOMContentLoaded', function () {

    const defaultCity = 'Athens';
    
    search.value = defaultCity;
    timeCity(defaultCity);
    
});

searchBtn.onclick = () => {
    timeCity(search.value);
};

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = search.value;

    getTimeForCity(city);
});

async function timeCity(city) {
    try {
        const result = await getWeatherData(city);
        updateUI(result);
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}