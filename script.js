let sentence = "The quick brown fox jumps over the lazy dog.";

let text = document.getElementById("text");
let input = document.getElementById("input");

let time = 30;
let timer;
let started = false;


// Display sentence
for (let i = 0; i < sentence.length; i++) {

    let letter = document.createElement("span");

    letter.innerText = sentence[i];

    text.appendChild(letter);
}


// Start test
function startTest() {

    if (started) {
        return;
    }

    started = true;

    timer = setInterval(function() {

        time--;

        document.getElementById("time").innerText = time;

        if (time == 0) {

            clearInterval(timer);

            input.disabled = true;

        }

    }, 1000);
}


// Check letters
input.addEventListener("input", function() {

    let typed = input.value;
    let letters = text.children;

    for (let i = 0; i < letters.length; i++) {

        letters[i].classList.remove("correct", "wrong");

        if (i < typed.length) {

            if (typed[i] == sentence[i]) {
                letters[i].classList.add("correct");
            } 
            else {
                letters[i].classList.add("wrong");
            }
        }
    }

    // Calculate WPM
    let words = typed.trim().split(" ").length;

    let seconds = 30 - time;

    if (seconds > 0) {

        let wpm = Math.round(words / (seconds / 60));

        document.getElementById("wpm").innerText = wpm;
    }

});


// Restart
function restart() {

    clearInterval(timer);

    time = 30;
    started = false;

    input.value = "";
    input.disabled = false;

    document.getElementById("time").innerText = "30";
    document.getElementById("wpm").innerText = "0";

    let letters = text.children;

    for (let letter of letters) {
        letter.classList.remove("correct", "wrong");
    }
}