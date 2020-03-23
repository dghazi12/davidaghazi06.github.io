//This function, once ready, will make a request to the openweathermap API and retrieve all of the data
$(document).ready(function () {
    $("#button-addon1").click(function () {

        const queryURL = 'http://api.openweathermap.org/data/2.5/weather'
        const city = $('.form-control').val();
        const key = '52af5110a99ad9f2762ddfe25f5f2b69'

        $.ajax({
            url: queryURL,
            dataType: 'json',
            type: 'GET',
            data: {q: city, appid: key, units: 'metric'},

            success: function (data) {

                console.log(data)

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

    $('.form-control').val('')
}

function 