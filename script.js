//Open Weather URL and key to make API calls
const queryURL = 'http://api.openweathermap.org/data/2.5/weather'
const key = '52af5110a99ad9f2762ddfe25f5f2b69'

const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast'
const toronto = 'Toronto'

//This function is set to give the weather in Toronto, the default city chosen
$(document).ready(function () {

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
            $('#temperature').append('Temperature: ' + data.main.temp + ' &deg;C ')
            $('#humidity').append('Humidity: ' + data.main.humidity + '%')
            $('#wind').append('Wind Speed: ' + data.wind.speed + ' m/s')

            //Appending the weather image icon
            const img = "https://openweathermap.org/img/wn/" + (data.weather[0].icon) + "@2x.png"; 
            
            const torontoIcon = $("<img>");

            torontoIcon.attr("src", img);
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
                    console.log(uvIndex)

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

            $('#date').append(data.list[4].dt_txt)
            $('#card-temperature').append('Temperature: ' + data.list[4].main.temp + ' &deg;C ')
            $('#card-humidity').append('Humidity: ' + data.list[4].main.humidity + '%')

            $('#date2').append(data.list[12].dt_txt)
            $('#card-temperature2').append('Temperature: ' + data.list[12].main.temp + ' &deg;C ')
            $('#card-humidity2').append('Humidity: ' + data.list[12].main.humidity + '%')

            $('#date3').append(data.list[20].dt_txt)
            $('#card-temperature3').append('Temperature: ' + data.list[20].main.temp + ' &deg;C ')
            $('#card-humidity3').append('Humidity: ' + data.list[20].main.humidity + '%')

            $('#date4').append(data.list[28].dt_txt)
            $('#card-temperature4').append('Temperature: ' + data.list[28].main.temp + ' &deg;C ')
            $('#card-humidity4').append('Humidity: ' + data.list[28].main.humidity + '%')

            $('#date5').append(data.list[36].dt_txt)
            $('#card-temperature5').append('Temperature: ' + data.list[36].main.temp + ' &deg;C ')
            $('#card-humidity5').append('Humidity: ' + data.list[36].main.humidity + '%')

        }

    });

}

//This function, once ready, will make a request to the open weather map API and retrieve all of the data
$(document).ready(function () {

    $("#button-addon1").click(function () {

        const city = $('.form-control').val();

        $.ajax({
            url: queryURL,
            dataType: 'json',
            type: 'GET',
            data: { appid: key, q: city, units: 'metric' },

            success: function (data) {

                $('.weather').empty()

                $('#title').append(data.name)
                $('#temperature').append('Temperature: ' + data.main.temp + ' &deg;C ')
                $('#humidity').append('Humidity: ' + data.main.humidity + '%')
                $('#wind').append('Wind Speed: ' + data.wind.speed + ' m/s')

                //Getting lon + lat of city searched by user to get the UV Index
                const lon = (data.coord.lon)
                const lat = (data.coord.lat)

                console.log(lon, lat)
                console.log(data)

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
                        console.log(uvIndex)

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

        saveCity()

    });

});

// This function appends all of the users search to the webpage
function saveCity() {

    const city = $('.form-control').val();

    const cityList = $('.list-group-item').append('<ul></ul>');
    cityList.append(city)

}

//5 Day Forecast
$(document).ready(function () {
    $("#button-addon1").click(function () {

        const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast'

        const city = $('.form-control').val();

        $.ajax({
            url: forecastURL,
            dataType: 'json',
            type: 'GET',
            data: { appid: key, q: city, units: 'metric' },

            success: function (data) {

                $('.forecast').empty()

                $('#date').append(data.list[4].dt_txt)
                $('#card-temperature').append('Temperature: ' + data.list[4].main.temp + ' &deg;C ')
                $('#card-humidity').append('Humidity: ' + data.list[4].main.humidity + '%')

                $('#date2').append(data.list[12].dt_txt)
                $('#card-temperature2').append('Temperature: ' + data.list[12].main.temp + ' &deg;C ')
                $('#card-humidity2').append('Humidity: ' + data.list[12].main.humidity + '%')

                $('#date3').append(data.list[20].dt_txt)
                $('#card-temperature3').append('Temperature: ' + data.list[20].main.temp + ' &deg;C ')
                $('#card-humidity3').append('Humidity: ' + data.list[20].main.humidity + '%')

                $('#date4').append(data.list[28].dt_txt)
                $('#card-temperature4').append('Temperature: ' + data.list[28].main.temp + ' &deg;C ')
                $('#card-humidity4').append('Humidity: ' + data.list[28].main.humidity + '%')

                $('#date5').append(data.list[36].dt_txt)
                $('#card-temperature5').append('Temperature: ' + data.list[36].main.temp + ' &deg;C ')
                $('#card-humidity5').append('Humidity: ' + data.list[36].main.humidity + '%')

            }

        });

    });

});