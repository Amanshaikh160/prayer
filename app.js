async function fetchPrayerTimes() {
    const city = document.getElementById("city").value;
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=&method=2&school=1`
      ); 
      const data = await response.json();

      if (data.code !== 200) {
        alert("City not found or invalid response!");
        return;
      }

      const timings = data.data.timings;

      document.getElementById("fajr-time").textContent = convertTo12HourFormat(timings.Fajr);
      document.getElementById("dhuhr-time").textContent = convertTo12HourFormat(timings.Dhuhr);
      document.getElementById("asr-time").textContent = convertTo12HourFormat(timings.Asr);
      document.getElementById("maghrib-time").textContent = convertTo12HourFormat(timings.Maghrib);
      document.getElementById("isha-time").textContent = convertTo12HourFormat(timings.Isha);
    } catch (error) {
      alert("Error fetching prayer times. Please try again later.");
      console.error(error);
    }
  }
  
  function convertTo12HourFormat(time) {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }