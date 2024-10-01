let timer;
let isRunning = false;
let time = 0;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            time++;
            document.getElementById("timer").innerHTML = formatTime(time);
        }, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    time = 0;
    document.getElementById("timer").innerHTML = "00:00:00";
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}
