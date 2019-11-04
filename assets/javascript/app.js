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

      // setting the src attribute of the image to a propety pulled off the result item
      gifImage.attr("src", results[i].images.fixed_height.url);
      console.log('results[i].images.fixed_height.url', results[i].images.fixed_height.url);

      // make them fixed and still.....

      // appeding the paragraph and gifImage to the gifDiv
      gifDiv.prepend(p);
      gifDiv.prepend(gifImage);

      // prepending the gifDiv to the HTML page in the gifs-go-here area
      $("#gifs-go-here").prepend(gifDiv);
    }



  });

};

function renderButtons() {

  $("#buttons-view").empty();

  // loop through the array of topics to add the buttons to HTML
  for (var i = 0; i < topics.length; i++) {

    // dynamically generate buttons for each topic in the array
    var a = $("<button>");

    // add a class of gif-btn
    a.addClass("gif-btn");

    // add text to buttons from array
    a.text(topics[i]);

    // adding a data-attribute
    a.attr("data-name", topics[i]);

    // add buttons to buttons view
    $("#buttons-view").append(a);

  }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();

  // Adding movie from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-btn", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

