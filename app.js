window.addEventListener('load', () => {
    let lon;
    let lat;
    let ImageURL;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    // Fetch the Image URL from API data
    function dynamicUrl() {
        var url = `https:${ImageURL}`;
        var img = document.getElementById('imageid');
        img.src = url;
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.weatherapi.com/v1/current.json?key=b0dc5762b0214405961235850223008&q=${lat} and ${lon}&aqi=yes`;
            
            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                const {lat, lon, country} = data.location;
                const { temp_c, temp_f, condition} = data.current;
                // set DOM Element from the API
                console.log(data, lat, lon);
                temperatureDegree.textContent = temp_f;
                temperatureDescription.textContent = condition.text;
                locationTimezone.textContent = country;
                // get the link for Image Icon and run the function
                ImageURL = condition.icon;
                dynamicUrl();

                // Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = temp_c;
                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temp_f;
                    }
                });

            })
        });  
    }
    else{
        h1.textContent = "Your browser does not support it"
    }
});