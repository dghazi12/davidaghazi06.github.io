//This function, once ready, will make a request to the open weather map API and retrieve all of the data
$(document).ready(function () {

    //Checking to see if local storage is empty, if not append all cities in local storage
    if (localStorage.length > 0) {
        appendStorage()
    } else {
        $("#newCity").append('')
    }

    //Once the submit button is clicked, an API call will be made to get the 5-day forecast for the city searched by the user
    $("#button-addon1").click(function () {

        //This is where the user inputs the specific city they want to search for 
        const city = $('.form-control').val().trim();

        $.ajax({
            url: queryURL,
            dataType: 'json',
            type: 'GET',
            data: { appid: key, q: city, units: 'metric' },

            success: function (data) {

                //Clear out all the data before appending the new data
                $('.weather').empty()

                //Making the request for the specific data to be appended to the page
                $('#title').append(data.name)
                $('#temperature').append('Temperature: ' + Math.round(data.main.temp) + ' &deg;C ')
                $('#humidity').append('Humidity: ' + data.main.humidity + '%')
                $('#wind').append('Wind Speed: ' + data.wind.speed + ' m/s')

                //Appending the weather image icon
                const searchedImgIcon = "https://openweathermap.org/img/wn/" + (data.weather[0].icon) + "@2x.png";
                const searchedIcon = $("<img>");

                searchedIcon.attr("src", searchedImgIcon);
                $('#title').append(searchedIcon)

                //Getting lon + lat of city searched by user to get the UV Index
                const lon = (data.coord.lon)
                const lat = (data.coord.lat)

                //Putting the url together that will be used to make API call to open weather map to get the UV index value
                const uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=52af5110a99ad9f2762ddfe25f5f2b69&lat=";
                const long = "&lon=";
                const indexSearch = uvURL + lat + long + lon;

                //Making the API call to open weather map to get the UV index value
                $.ajax({
                    url: indexSearch,
                    dataType: 'json',
                    type: 'GET',

                    success: function (data) {
                        const uvIndex = data.value

                        $('#uv').empty()
                        $('#uv').append('UV Index: ' + uvIndex)

                        // If the UV index is between 0 and 2, style Green
                        if (uvIndex <= 2) {
                            $('#uv').attr("class", "uvGreen");
                            // If the UV index is between 3 and 5, style Yellow
                        } else if (uvIndex <= 5) {
                            $('#uv').attr("class", "uvYellow");
                            // If the UV index is 6 or 7, style Orange    
                        } else if (uvIndex <= 7) {
                            $('#uv').attr("class", "uvOrange");
                            // If the UV index is between 8 and 10, style Red
                        } else if (uvIndex <= 10) {
                            $('#uv').attr("class", "uvRed");
                            // If the UV index is 11+, style Purple
                        } else {
                            $('#uv').attr("class", "uvPurple");
                        }

                    }
                })

            }

        });

        //Calling the saveCity function to append the users search and save it to local storage
        saveCity()

    });

});

//5 Day Forecast for the cities searched by the users
$(document).ready(function fivedayForecast() {

    $("#button-addon1").click(function () {

        const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast'

        const city = $('.form-control').val().trim();

        $.ajax({
            url: forecastURL,
            dataType: 'json',
            type: 'GET',
            data: { appid: key, q: city, units: 'metric' },

            success: function (data) {

                $('.forecast').empty()

                //Appending the date, temperature and humidity for day 1 the 5 day forecast
                $('#date').append(data.list[0].dt_txt)
                $('#card-temperature').append('Temperature: ' + Math.round(data.list[0].main.temp) + ' &deg;C ')
                $('#card-humidity').append('Humidity: ' + data.list[0].main.humidity + '%')

                //Appending the icon image for the 5-day forecast weather
                const imgIcon1 = "https://openweathermap.org/img/wn/" + (data.list[0].weather[0].icon) + "@2x.png";
                const icon1 = $("<img>");

                icon1.attr("src", imgIcon1);
                $('#picture').append(icon1)

                //Appending the date, temperature and humidity for day 2 of the 5 day forecast
                $('#date2').append(data.list[7].dt_txt)
                $('#card-temperature2').append('Temperature: ' + Math.round(data.list[7].main.temp) + ' &deg;C ')
                $('#card-humidity2').append('Humidity: ' + data.list[7].main.humidity + '%')

                //Appending the icon image for the 5-day forecast weather
                const imgIcon2 = "https://openweathermap.org/img/wn/" + (data.list[7].weather[0].icon) + "@2x.png";
                const icon2 = $("<img>");

                icon2.attr("src", imgIcon2);
                $('#picture2').append(icon2);

                //Appending the date, temperature and humidity for day 3 of the 5 day forecast
                $('#date3').append(data.list[15].dt_txt)
                $('#card-temperature3').append('Temperature: ' + Math.round(data.list[15].main.temp) + ' &deg;C ')
                $('#card-humidity3').append('Humidity: ' + data.list[15].main.humidity + '%')

                //Appending the icon image for the 5-day forecast weather
                const imgIcon3 = "https://openweathermap.org/img/wn/" + (data.list[15].weather[0].icon) + "@2x.png";
                const icon3 = $("<img>");

                icon3.attr("src", imgIcon3);
                $('#picture3').append(icon3);

                //Appending the date, temperature and humidity for day 4 of the 5 day forecast
                $('#date4').append(data.list[23].dt_txt)
                $('#card-temperature4').append('Temperature: ' + Math.round(data.list[23].main.temp) + ' &deg;C ')
                $('#card-humidity4').append('Humidity: ' + data.list[23].main.humidity + '%')

                //Appending the icon image for the 5-day forecast weather
                const imgIcon4 = "https://openweathermap.org/img/wn/" + (data.list[23].weather[0].icon) + "@2x.png";
                const icon4 = $("<img>");

                icon4.attr("src", imgIcon4);
                $('#picture4').append(icon4);

                //Appending the date, temperature and humidity for day 5 of the 5 day forecast
                $('#date5').append(data.list[31].dt_txt)
                $('#card-temperature5').append('Temperature: ' + Math.round(data.list[31].main.temp) + ' &deg;C ')
                $('#card-humidity5').append('Humidity: ' + data.list[31].main.humidity + '%')

                //Appending the icon image for the 5-day forecast weather
                const imgIcon5 = "https://openweathermap.org/img/wn/" + (data.list[31].weather[0].icon) + "@2x.png";
                const icon5 = $("<img>");

                icon5.attr("src", imgIcon5);
                $('#picture5').append(icon5);

            }

        });

        //Clear the user search from the input bar once the submit button is clicked
        $('.form-control').val('');

    });

});

let cities = [];

//This function appends all of the users search and saves it to local storage
function saveCity() {

    event.preventDefault();

    let city = $('.form-control').val().trim()

    cities.push(city)

    $("#newCity").append('<ul><button class="btn btn-primary">' + city + '</button></ul>');

    //Saving the users search to local storage
    localStorage.setItem("cities", JSON.stringify(cities))

}

//This function, on refresh, will append all data from local storage to web page
function appendStorage() {

    //Getting the users search from local storage
    cities = JSON.parse(localStorage.getItem('cities'));

    //Looping through the users search history and appending it to the webpage
    for (let index = 0; index < cities.length; index++) {
        const element = cities[index];

        $("#newCity").append('<ul><button class="btn btn-primary clear">' + element + '</button></ul>');

    }

}

$(".cities").click(function () {
    let cityName = $(event.target).text()

    // fivedayForecast()
    console.log(cityName)
})