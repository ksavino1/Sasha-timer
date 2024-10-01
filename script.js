const countdownTime = 10 * 60 * 60; // 10 hours in seconds
let timerInterval;
let endTime;

// Function to start or continue the countdown
function startCountdown() {
    // Check if there's an end time saved in localStorage
    const savedEndTime = localStorage.getItem('endTime');
    
    if (savedEndTime) {
        // Parse the saved end time
        endTime = new Date(parseInt(savedEndTime, 10));
    } else {
        // If no end time is saved, set a new one 10 hours from now
        endTime = new Date(Date.now() + countdownTime * 1000);
        localStorage.setItem('endTime', endTime.getTime());
    }

    // Start or resume the countdown
    updateTimer(); // Update the timer immediately on load
    timerInterval = setInterval(updateTimer, 1000); // Update every second
}

// Function to update the timer display
function updateTimer() {
    const currentTime = new Date();
    const timeRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000));

    if (timeRemaining > 0) {
        document.getElementById("timer").innerHTML = formatTime(timeRemaining);
    } else {
        clearInterval(timerInterval);
        showGhost();
        localStorage.removeItem('endTime'); // Clear the saved end time when countdown is done
    }
}

// Function to format time as XX HOURS YY MINUTES ZZ SECONDS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hours)} HOURS ${pad(minutes)} MINUTES ${pad(secs)} SECONDS`;
}

// Function to pad numbers to two digits (e.g., 09 instead of 9)
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
