$(document).ready(function(){
    var topics = ['Audi', 'BMW', "Buick"];
    for(var i = 0; i < topics.length; i++){
         var newButton = $("<button/>").addClass( "btn btn-info topic").attr('data-name',topics[i]).html(topics[i]).css({'margin': '5px'});
         $("#topicsbuttons").append(newButton);
    }

    $('button').on('click', function() {
        var topic = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {

                var results = response.data;
                $('#gifs').html('')
                for (var i = 0; i < results.length; i++) {

                    var topicDiv = $('<div/>');

                    var p =$('<p/>');

                    p.text(results[i].rating);

                    var topicImage = $('<img/>');

                    topicImage.addClass('anImg')

                    topicImage.attr('src', results[i].images.fixed_height.url);

                    topicImage.attr('data-still', results[i].images.fixed_height_still.url)

                    topicImage.attr('data-animate', results[i].images.fixed_height.url)

                    .attr('data-state', 'still');

                    topicDiv.append(p);

                    topicDiv.append(topicImage);

                    topicDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 

                    if (state == 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });
    });

   

    
        //This function "adds" the buttons 

        // handles the event when clicked
        $('#addButton').on('click', function(){
            var topicButton = $("#gif-input").val();
            //adds the new topic

            var newButton = $("<button/>").addClass( "btn btn-info topic").attr('data-name',topicButton).html(topicButton).css({'margin': '5px'});
            
            $("#topicsbuttons").append(newButton);

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicButton + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
            url: queryURL,
            method: 'GET'
            })

            .done(function(response) {

            var results = response.data;
                $('#gifs').html('')
                for (var i = 0; i < results.length; i++) {

                    var topicDiv = $('<div/>');

                    var p =$('<p/>');

                    p.text(results[i].rating);

                    var topicImage = $('<img/>');

                    topicImage.addClass('anImg')

                    topicImage.attr('src', results[i].images.fixed_height_still.url);

                    topicImage.attr('data-still', results[i].images.fixed_height_still.url)

                    topicImage.attr('data-animate', results[i].images.fixed_height.url)

                    .attr('data-state', 'still');

                    topicDiv.append(p);

                    topicDiv.append(topicImage);

                    topicDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    if (state == 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });

            $("#gif-input").val("");
            return false;
        })
  
});