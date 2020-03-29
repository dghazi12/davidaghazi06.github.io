//Open Weather URL and key to make API calls
const queryURL = 'http://api.openweathermap.org/data/2.5/weather'
const key = '52af5110a99ad9f2762ddfe25f5f2b69'

const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast'
const toronto = 'Toronto'

//This function is set to give the weather in Toronto, the default city chosen
$(document).ready(function () {

    //Checking to see if local storage is empty, if not append all cities in local storage
    if (localStorage.length > 0){
        appendStorage()
    }else{
        $("#newCity").append('')
    }

    $.ajax({
        url: queryURL,
        dataType: 'json',
        type: 'GET',
        data: { q: toronto, appid: key, units: 'metric' },

        success: function (data) {

            //Clear out all the data before appending the new data
            $('#title').empty()
            $('#temperature').empty()
            $('#humidity').empty()
            $('#wind').empty()

            //Making the request for the specific data to be appended to the page
            $('#title').append(data.name)
            $('#temperature').append('Temperature: ' + Math.round(data.main.temp) + ' &deg;C ')
            $('#humidity').append('Humidity: ' + data.main.humidity + '%')
            $('#wind').append('Wind Speed: ' + data.wind.speed + ' m/s')

            //Appending the weather image icon
            const torontoImgIcon = "https://openweathermap.org/img/wn/" + (data.weather[0].icon) + "@2x.png"; 
            const torontoIcon = $("<img>");

            torontoIcon.attr("src", torontoImgIcon);
            $('#title').append(torontoIcon)

            //API request to get the 5-day forecast for Toronto
            const torontoIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=52af5110a99ad9f2762ddfe25f5f2b69&lat=43.7&lon=-79.42";

            $.ajax({
                url: torontoIndexURL,
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

    torontoForecast()

});

//This function shows the 5-day forecast for Toronto, the default city chosen
function torontoForecast() {

    $.ajax({
        url: forecastURL,
        dataType: 'json',
        type: 'GET',
        data: { appid: key, q: toronto, units: 'metric' },

        success: function (data) {

            $('.forecast').empty()

            //Appending the date, temperature and humidity for the 5 day forecast
            $('#date').append(data.list[0].dt_txt)
            $('#card-temperature').append('Temperature: ' + Math.round(data.list[0].main.temp) + ' &deg;C ')
            $('#card-humidity').append('Humidity: ' + data.list[0].main.humidity + '%')

            //Appending the icon image for the 5-day forecast weather
            const torontoImgIcon1 = "https://openweathermap.org/img/wn/" + (data.list[0].weather[0].icon) + "@2x.png"; 
            const torontoIcon1 = $("<img>");

            torontoIcon1.attr("src", torontoImgIcon1);
            $('#picture').append(torontoIcon1)

            //Appending the date, temperature and humidity for the 5 day forecast
            $('#date2').append(data.list[7].dt_txt)
            $('#card-temperature2').append('Temperature: ' + Math.round(data.list[7].main.temp) + ' &deg;C ')
            $('#card-humidity2').append('Humidity: ' + data.list[7].main.humidity + '%')

            //Appending the icon image for the 5-day forecast weather
            const torontoImgIcon2 = "https://openweathermap.org/img/wn/" + (data.list[7].weather[0].icon) + "@2x.png"; 
            const torontoIcon2 = $("<img>");

            torontoIcon2.attr("src", torontoImgIcon2);
            $('#picture2').append(torontoIcon2)

            //Appending the date, temperature and humidity for the 5 day forecast
            $('#date3').append(data.list[15].dt_txt)
            $('#card-temperature3').append('Temperature: ' + Math.round(data.list[15].main.temp) + ' &deg;C ')
            $('#card-humidity3').append('Humidity: ' + data.list[15].main.humidity + '%')

            //Appending the icon image for the 5-day forecast weather
            const torontoImgIcon3 = "https://openweathermap.org/img/wn/" + (data.list[15].weather[0].icon) + "@2x.png"; 
            const torontoIcon3 = $("<img>");

            torontoIcon3.attr("src", torontoImgIcon3);
            $('#picture3').append(torontoIcon3);

            //Appending the date, temperature and humidity for the 5 day forecast
            $('#date4').append(data.list[23].dt_txt)
            $('#card-temperature4').append('Temperature: ' + Math.round(data.list[23].main.temp) + ' &deg;C ')
            $('#card-humidity4').append('Humidity: ' + data.list[23].main.humidity + '%')

            //Appending the icon image for the 5-day forecast weather
            const torontoImgIcon4 = "https://openweathermap.org/img/wn/" + (data.list[23].weather[0].icon) + "@2x.png"; 
            const torontoIcon4 = $("<img>");

            torontoIcon4.attr("src", torontoImgIcon4);
            $('#picture4').append(torontoIcon4);

            //Appending the date, temperature and humidity for the 5 day forecast
            $('#date5').append(data.list[31].dt_txt)
            $('#card-temperature5').append('Temperature: ' + Math.round(data.list[31].main.temp) + ' &deg;C ')
            $('#card-humidity5').append('Humidity: ' + data.list[31].main.humidity + '%')

            //Appending the icon image for the 5-day forecast weather
            const torontoImgIcon5 = "https://openweathermap.org/img/wn/" + (data.list[31].weather[0].icon) + "@2x.png"; 
            const torontoIcon5 = $("<img>");

            torontoIcon5.attr("src", torontoImgIcon5);
            $('#picture5').append(torontoIcon5);

        }

    });

}