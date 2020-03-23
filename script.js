//Open Weather URL and key to make API calls
const queryURL = 'http://api.openweathermap.org/data/2.5/weather'
const key = '52af5110a99ad9f2762ddfe25f5f2b69'

//This function is set to give the weather in Toronto, the default city chosen
$(document).ready(function () {

    const toronto = 'Toronto'

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

            console.log(data)

        }

    });

    torontoForecast()

});

function torontoForecast(){

    const toronto = 'Toronto'
    const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast'

    $.ajax({
        url: forecastURL,
        dataType: 'json',
        type: 'GET',
        data: { appid: key, q: toronto, units: 'metric' },

        success: function (data) {

            $('.forecast').empty()

            $('#date').append(data.list[1].dt_txt)
            $('#card-temperature').append('Temperature: ' + data.list[1].main.temp + ' &deg;C ')
            $('#card-humidity').append('Humidity: ' + data.list[1].main.humidity + '%')

            $('#date2').append(data.list[9].dt_txt)
            $('#card-temperature2').append('Temperature: ' + data.list[9].main.temp + ' &deg;C ')
            $('#card-humidity2').append('Humidity: ' + data.list[9].main.humidity + '%')

            $('#date3').append(data.list[17].dt_txt)
            $('#card-temperature3').append('Temperature: ' + data.list[17].main.temp + ' &deg;C ')
            $('#card-humidity3').append('Humidity: ' + data.list[17].main.humidity + '%')

            $('#date4').append(data.list[25].dt_txt)
            $('#card-temperature4').append('Temperature: ' + data.list[25].main.temp + ' &deg;C ')
            $('#card-humidity4').append('Humidity: ' + data.list[25].main.humidity + '%')

            $('#date5').append(data.list[33].dt_txt)
            $('#card-temperature5').append('Temperature: ' + data.list[33].main.temp + ' &deg;C ')
            $('#card-humidity5').append('Humidity: ' + data.list[33].main.humidity + '%')

        }

    });

}

//This function, once ready, will make a request to the openweathermap API and retrieve all of the data
$(document).ready(function () {
    $("#button-addon1").click(function () {

        const city = $('.form-control').val();

        $.ajax({
            url: queryURL,
            dataType: 'json',
            type: 'GET',
            data: { appid: key, q: city, units: 'metric' },

            success: function (data) {

                $('#title').empty()
                $('#temperature').empty()
                $('#humidity').empty()
                $('#wind').empty()

                // console.log(data)

                // const name = (data.name)
                $('#title').append(data.name)
                $('#temperature').append('Temperature: ' + data.main.temp + ' &deg;C ')
                $('#humidity').append('Humidity: ' + data.main.humidity + '%')
                $('#wind').append('Wind Speed: ' + data.wind.speed + ' m/s')

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

                console.log(data)
                $('#date').empty()
                $('#date').append(data.list[1].dt_txt)

            }

        });

    });

});