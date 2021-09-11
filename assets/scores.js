var resetButton = document.querySelector("#clear-storage");

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return console.log(values);
}

function clearStorage() {
    localStorage.clear();
}

resetButton.addEventListener("click", clearStorage)