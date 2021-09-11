var resetButton = document.querySelector("#clear-storage");
var highScoreEl = document.querySelector("#score-container")

// iterate localStorage
function displayScores() {
    for (var i = 0; i < localStorage.length; i++) {

        // set iteration key name
        var key = localStorage.key(i);
    
        // use key name to retrieve the corresponding value
        var value = localStorage.getItem(key);

        var displayScore = document.createElement("li");
    
        // Append values to high score section
        displayScore.textContent = `${key} - ${value}`;
        highScoreEl.append(displayScore);
    }
}

function clearStorage() {
    localStorage.clear();
    window.location.reload();
}

resetButton.addEventListener("click", clearStorage)

displayScores();