let countdownTime = 10 * 60 * 60; // 10 hours in seconds
let timerInterval;
let timeRemaining;

// Function to start the countdown
function startCountdown() {
    const savedTime = localStorage.getItem('timeRemaining');
    const savedTimestamp = localStorage.getItem('timestamp');

    if (savedTime && savedTimestamp) {
        // Calculate the difference between now and when the time was saved
        const elapsedTime = Math.floor((Date.now() - savedTimestamp) / 1000);
        timeRemaining = Math.max(0, savedTime - elapsedTime);
    } else {
        timeRemaining = countdownTime;
    }

    // If timer has reached zero, show ghost immediately
    if (timeRemaining === 0) {
        showGhost();
        return;
    }

    // Start the countdown
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            document.getElementById("timer").innerHTML = formatTime(timeRemaining);
            // Save the remaining time and the current timestamp in localStorage
            localStorage.setItem('timeRemaining', timeRemaining);
            localStorage.setItem('timestamp', Date.now());
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
    // Clear localStorage since the countdown is finished
    localStorage.removeItem('timeRemaining');
    localStorage.removeItem('timestamp');
}

// Start the countdown immediately when the page loads
startCountdown();
