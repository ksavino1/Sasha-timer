let countdownTime = 10 * 60 * 60; // 10 hours in seconds
let timerInterval;
let timeRemaining;

// Function to start the countdown
function startCountdown() {
    const savedEndTime = localStorage.getItem('endTime');

    if (savedEndTime) {
        // Calculate the remaining time
        timeRemaining = Math.max(0, Math.floor((savedEndTime - Date.now()) / 1000));
    } else {
        timeRemaining = countdownTime;
        // Set the end time in localStorage
        localStorage.setItem('endTime', Date.now() + timeRemaining * 1000);
    }

    // If timer has reached zero, show ghost immediately
    if (timeRemaining === 0) {
        showGhost();
        return;
    }

    // Start the countdown
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        document.getElementById("timer").innerHTML = formatTime(timeRemaining);
    } else {
        clearInterval(timerInterval);
        showGhost();
    }
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
    // Clear localStorage since the countdown is finished
    localStorage.removeItem('endTime');
}

// Start the countdown immediately when the page loads
startCountdown();
