$(document).ready(function () {

    // Initial array of Marvel characters
    var marvelArray = ["Scarlet Witch", "Vision", "Quicksilver", "Iron Man", "Spider-Man", "The Wasp", "Ant-Man", "Black Widow", "Hawkeye", "Doctor Strange", "Okoye", "Black Panther", "Shuri", "Star-Lord", "Rocket Raccoon", "Drax", "Mantis", "Nebula", "Gamora", "Captain America", "Groot", "Thor", "Loki", "Venom", "Daredevil", "Storm", "Wolverine", "Mystique", "Magneto", "Thanos", "Deadpool", "The Hulk", "Captain Marvel"];


    // Generic function for capturing the character name from the data-attribute
    function alertCharacterName() {
        var characterName = $(this).attr("data-name");
        alert(characterName);
      }

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


    $(document).on("click", ".character", alertCharacterName);
    renderButtons();


});
