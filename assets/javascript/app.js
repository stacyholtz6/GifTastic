// initial array of topics
var topics = ["cat", "dog", "owl", "bluebird", "pika", "mice"];


function displayTopicInfo() {

  var name = $(this).attr("data-name");
  console.log(name);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=folqBMhg1OhI6p3Jyhh2z1s8d0ZA2GGG&limit=10";

  console.log('queryURL', queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var results = response.data;
    console.log(' response', response);
    console.log('results', results);

    // loop through the results from giphy API
    for (var i = 0; i < results.length; i++) {

      // create and store a div tag for the gif
      var gifDiv = $("<div>");

      // create a paragraph to store the rating of the gif 
      var p = $("<p>").text("Rating: " + results[i].rating);
      console.log('results[i].rating', results[i].rating);

      // create and store an image tag for the gif
      var gifImage = $("<img>");

      // setting the src attribute of the image to a propety pulled off the result item - start out with it still to animate on click - gif that is loaded when button is clicked
      gifImage.attr("src", results[i].images.fixed_height_still.url);

      // add a class to the gif so it can be called in onclick to animate and make still.
      gifImage.attr("class", "gif");

      // code block to toggle between animated and still when the gif is clicked - setting the data attributes animate and still.
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);


      // appeding the paragraph and gifImage to the gifDiv
      gifDiv.prepend(p);
      gifDiv.prepend(gifImage);

      // prepending the gifDiv to the HTML page in the gifs-go-here area
      $("#gifs-go-here").prepend(gifDiv);
    }

  });

};

// why do some of them work and some of them don't - has to be outside the ajax call to work properly
$("#gifs-go-here").on("click", ".gif", function () {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})

function renderButtons() {

  $("#buttons-view").empty();

  // loop through the array of topics to add the buttons to HTML
  for (var i = 0; i < topics.length; i++) {

    // dynamically generate buttons for each topic in the array
    var a = $("<button>");

    // add a class of gif-btn
    a.addClass("gif-btn btn btn-info");

    // add text to buttons from array
    a.text(topics[i]);

    // adding a data-attribute
    a.attr("data-name", topics[i]);

    // add buttons to buttons view
    $("#buttons-view").append(a);

  }
}



// This function handles events when a gif button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();

  // Adding text from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topic array
  renderButtons();

  $("#topic-input").val('');
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

