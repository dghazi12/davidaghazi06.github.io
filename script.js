$("#button-addon1").on("click", function(){

    const userInput = $('.form-control').val();

    const cityList = $('.list-group-item').append('<ul></ul>');
    cityList.append(userInput)
    
    $('.form-control').val('')
})