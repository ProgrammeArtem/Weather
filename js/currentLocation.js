document.addEventListener('DOMContentLoaded', function () {
  const btnLocation = document.getElementById('btnLocation');
  const searchInput = document.getElementById('search');

  btnLocation.addEventListener('click', getLocation);

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
  }

  function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Викликаємо функцію для отримання назви міста англійськими літерами
      getCityName(latitude, longitude);
  }

  function error() {
      console.error("Unable to retrieve your location.");
  }

  async function getCityName(latitude, longitude) {
      try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&language=en`);
          const data = await response.json();

          if (data.address) {
              const city = data.address.city || data.address.village || data.address.town;

              // Вставляємо назву міста англійськими літерами у поле пошуку
              searchInput.value = `${city}`;
          } else {
              console.error("Location data is incomplete.");
          }
      } catch (error) {
          console.error("Error fetching location data:", error);
      }
  }
});