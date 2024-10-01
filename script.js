let timeRemaining = 10 * 60 * 60; // 10 hours in seconds

// Function to start the countdown
function startCountdown() {
    const timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            document.getElementById("timer").innerHTML = formatTime(timeRemaining);
        } else {
            clearInterval(timerInterval);
            showGhost();
        }
    }, 1000);
}

// Function to format time as XX HOURS YY MINUTES ZZ SECONDS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hours)} HOURS ${pad(minutes)} MINUTES ${pad(secs)} SECONDS`;
}

// Function to pad numbers to two digits
function pad(number) {
    return number < 10 ? `0${number}` : number;
}

// Function to show ghost image when timer reaches 0
function showGhost() {
    document.getElementById("timer").style.display = "none";  // Hide the timer
    document.getElementById("ghost").style.display = "block"; // Show the ghost image
}

// Start the countdown immediately when the page loads
startCountdown();
