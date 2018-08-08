$(document).ready(function () {

    // Initial array of Marvel characters
    var marvelArray = ["Scarlet Witch", "Vision", "Quicksilver", "Iron Man", "Spider-Man", "The Wasp", "Ant-Man", "Black Widow", "Hawkeye", "Doctor Strange", "Okoye", "Black Panther", "Shuri", "Star-Lord", "Rocket Raccoon", "Drax", "Mantis", "Nebula", "Gamora", "Captain America", "Groot", "Thor", "Loki", "Venom", "Daredevil", "Storm", "Wolverine", "Mystique", "Magneto", "Thanos", "Deadpool", "The Hulk", "Captain Marvel"];

    // Function for dumping the JSON content for each button into the div
    function displayCharacters() {

        $("#marvelCharacters").empty();

        var characterName = $(this).attr("data-name");
        var nameNoSpace = characterName.replace(/ /g, "%20");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + nameNoSpace + "%20Marvel&api_key=xy4lY11exI2GePmdAFdsV1EpMSuNXop4&limit=10";
        console.log(queryURL);
        // AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                // Creating a div to hold the charater
                var characterDiv = $("<div>");

                // Retrieving the URL for the still image
                var imgURL = response.data[i].images.fixed_height_still.url;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");

                // Appending the image
                characterDiv.append(image);

                // Storing the rating data
                var rating = response.data[i].rating;

                // Creating an element to have the rating displayed
                var paragraphRating = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                characterDiv.append(paragraphRating);

                // Putting the entire character above the previous characters
                $("#marvelCharacters").append(characterDiv);
            }

        }).catch(function (error) {
            console.log(error);
        });

    }

   
    // Function to play and pause gifs
    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    
    
   
    // Function for displaying Marvel Character buttons
    function renderButtons() {

        // Delete the content inside the marvelCharacterButtons div prior to adding new characters
        $("#marvelCharacterButtons").empty();
        // Loop through the array of characters, then generate buttons for each charcater in the array
        for (var i = 0; i < marvelArray.length; i++) {

            // Dynamicaly generate buttons for each character in the array.
            var addBtn = $("<button>");
            // Adding a class of charcater
            addBtn.addClass("character");
            // Adding a data-attribute with a value of the charcater at index i
            addBtn.attr("data-name", marvelArray[i]);
            // Providing the button's text with a value of the character at index i
            addBtn.text(marvelArray[i]);
            // Adding the button to the HTML
            $("#marvelCharacterButtons").append(addBtn);
        }
    }

    // Function to handle event when the add Marvel character button is clicked
    $("#addMarvelCharacter").on("click", function (event) {

        event.preventDefault();

        var newMarvelCharacter = $('#marvel-character-input').val().trim();

        marvelArray.push(newMarvelCharacter);

        renderButtons();
    });


    $(document).on("click", ".character", displayCharacters);

    renderButtons();

});
