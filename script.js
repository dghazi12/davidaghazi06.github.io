$("#button-addon1").on("click", function(){
    const userInput = $('.form-control').val();

    const cityList = $('.list-group').append('<li>Montreal</li>');
    $('.cities').append(cityList);
    
    // let $myList = $('ul').append('<li>text</li>');
    // $('.cities').append($myList);
    // console.log(userInput)
    // $('.form-control').val('')
})

// var $myList = $('ul').append('<li>Montreal</li>');
// $('.cities').append($myList);