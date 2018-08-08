$(document).ready(function () {

    // Initial array of movies
    var marvelArray = ["Scarlet Witch", "Vision", "Iron Man", "Spider-Man", "The Wasp", "Ant-Man", "Black Widow", "Hawk Eye", "Doctor Strange", "Okoye", "Black Panther", "Shuri", "Mantis", "Nebula", "Gamora", "Captain America", "Groot", "Thor", "Storm", "Wolverine", "Mystique"];

    // Function for displaying Marvel Character buttons
    function renderButtons() {

        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#marvelCharacterButtons").empty();
        // Loop through the array of movies, then generate buttons for each movie in the array
        for (var i = 0; i < marvelArray.length; i++) {
            var addBtn = $("<button>" + marvelArray[i] + "</button>");
            $("#marvelCharacterButtons").append(addBtn);
        }
    }

    renderButtons();


});
