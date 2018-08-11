$(document).ready(function () {

    // Initial array of Marvel characters
    var marvelArray = ["Scarlet Witch", "Vision", "Quicksilver", "Iron Man", "Spider-Man", "The Wasp", "Ant-Man", "Black Widow", "Hawkeye", "Doctor Strange", "Okoye", "Black Panther", "Shuri", "Star-Lord", "Rocket Raccoon", "Drax", "Mantis", "Nebula", "Gamora", "Captain America", "Groot", "Thor", "Loki", "Venom", "Daredevil", "Storm", "Wolverine", "Mystique", "Magneto", "Thanos", "Deadpool", "The Hulk", "Captain Marvel"];
    var limit = 10;
    var newLimit = 10;
    // Function for dumping the JSON content for each button into the div
    function displayCharacters() {
        $("#marvelCharacters").empty();
        $("#moreGifs").empty()
        newLimit = 10;
        var characterName = $(this).attr("data-name");
        var nameNoSpace = characterName.replace(/ /g, "%20");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nameNoSpace + "%20Marvel&api_key=xy4lY11exI2GePmdAFdsV1EpMSuNXop4&limit=" + limit;
        console.log(queryURL);
        // AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                // Creating a div to hold the charater
                var characterDiv = $("<div>");
                characterDiv.addClass("card");
                characterDiv.attr("style", "float:left; margin: 20px 20px ;");

                // Retrieving the URL for the still image
                var imgURL = response.data[i].images.fixed_height_still.url;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
                image.attr("style", "height:200px;");
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("card-img-top gif");

                // Appending the image
                characterDiv.append(image);

                var cardBody = $("<div>");
                cardBody.addClass("card-body");

                // Storing the rating data
                var rating = response.data[i].rating;

                // Storing the title data
                var title = response.data[i].title;

                // Storing the download link data
                var download = response.data[i].images.fixed_height.url;

                // Creating an element to have the card title and text displayed
                var cardText = $("<span>").text(" Rating: " + rating);
                var cardTitle = $("<h5>").text(title);
                var downloadText = $("<a download>").text(" Download Gif");
                downloadText.attr("href", download);
                cardText.addClass("card-text");
                cardTitle.addClass("card-title");
                downloadText.addClass("card-download");

                // Creating an element to have the download link displayed
                var downloadIcon = $("<i>");
                downloadIcon.addClass("fas fa-download");

                // Creating an element to have the rating displayed
                var ratingIcon = $("<i>");
                ratingIcon.addClass("fas fa-star");

                // Creating an element to have a line break
                var lineBreak = $("<br />");

                // Appending all elements together
                cardBody.append(cardTitle).append(ratingIcon).append(cardText).append(lineBreak).append(downloadIcon).append(downloadText);

                // Appending the character div to our HTML page
                characterDiv.append(cardBody);

                // Putting the entire character above the previous characters
                $("#marvelCharacters").append(characterDiv);
            }

        }).catch(function (error) {
            console.log(error);
        });

        // Function to create an Add More Gifs button
        if ($("#moreGifs").html() === "") {
            // adding the load more gifs button
            var moreButton = $("<button>");
            // Adding a class of more-gifs
            moreButton.addClass("more-gifs");
            // Adding a data-attribute with a value of the charcater
            moreButton.attr("data-name", characterName);
            // Providing the button's text
            moreButton.text("+ Load 10 more gifs");
            // Adding the button to the HTML
            $("#moreGifs").append(moreButton);
        }

    }

    // Function to make gifs play and pause on click
    $(document).on('click', '.gif', function () {
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
        saveMarvelArray();
        $('#marvel-character-input').val("");

        renderButtons();
    });

    getMarvelArray();

    // Function to save data to local storage
    function saveMarvelArray() {
        var str = JSON.stringify(marvelArray);
        localStorage.setItem("marvelArray", str)
    }

    // Function to get data from local storage
    function getMarvelArray() {
        var str = localStorage.getItem("marvelArray");
        marvelArray = JSON.parse(str);
        if (!marvelArray) {
            marvelArray = ["Scarlet Witch", "Vision", "Quicksilver", "Iron Man", "Spider-Man", "The Wasp", "Ant-Man", "Black Widow", "Hawkeye", "Doctor Strange", "Okoye", "Black Panther", "Shuri", "Star-Lord", "Rocket Raccoon", "Drax", "Mantis", "Nebula", "Gamora", "Captain America", "Groot", "Thor", "Loki", "Venom", "Daredevil", "Storm", "Wolverine", "Mystique", "Magneto", "Thanos", "Deadpool", "The Hulk", "Captain Marvel"];

        }
    }

    // Function to display gifs on page when character button is clicked
    $(document).on("click", ".character", displayCharacters);

    // Function to display 10 more additonal gifs on page when "Add 10 more gifs" is clicked
    $(document).on("click", ".more-gifs", displayAgain);

    // Function to display additional gifs when load more is pushed
    function displayAgain() {

        $("#marvelCharacters").empty();

        var characterName = $(this).attr("data-name");
        var nameNoSpace = characterName.replace(/ /g, "%20");
        newLimit = newLimit + 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nameNoSpace + "%20Marvel&api_key=xy4lY11exI2GePmdAFdsV1EpMSuNXop4&limit=" + newLimit;
        console.log(queryURL);
        // AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                // Creating a div to hold the charater
                var characterDiv = $("<div>");
                characterDiv.addClass("card");
                characterDiv.attr("style", "float:left; margin: 20px 20px ;");

                // Retrieving the URL for the still image
                var imgURL = response.data[i].images.fixed_height_still.url;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
                image.attr("style", "height:200px;");
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("card-img-top gif");

                // Appending the image
                characterDiv.append(image);

                var cardBody = $("<div>");
                cardBody.addClass("card-body");


                // Storing the rating data
                var rating = response.data[i].rating;
                var title = response.data[i].title;
                var download = response.data[i].images.fixed_height.url;

                // Creating an element to have the rating displayed
                var cardText = $("<span>").text(" Rating: " + rating);
                var cardTitle = $("<h5>").text(title);
                var downloadText = $("<a download>").text(" Download Gif");
                downloadText.attr("href", download);
                cardText.addClass("card-text");
                cardTitle.addClass("card-title");
                downloadText.addClass("card-download");

                var downloadIcon = $("<i>");
                downloadIcon.addClass("fas fa-download");

                var ratingIcon = $("<i>");
                ratingIcon.addClass("fas fa-star");

                var lineBreak = $("<br />");

                cardBody.append(cardTitle).append(ratingIcon).append(cardText).append(lineBreak).append(downloadIcon).append(downloadText);

                characterDiv.append(cardBody);



                // Putting the entire character above the previous characters
                $("#marvelCharacters").append(characterDiv);
            }

        }).catch(function (error) {
            console.log(error);
        });



    }
    
    // Render buttons on page load
    renderButtons();

});
