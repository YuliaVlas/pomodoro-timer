const timerElement = document.getElementById('pomodoro-time');
const start = document.getElementById('start');
let timeLeft = 25 * 60;
let timer;
let isRunning = false;

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const updateTimerDisplay = () => {
    timerElement.textContent = formatTime(timeLeft);
};

const startTimer = () => {
    if (!isRunning) {
        isRunning = true;
        start.textContent = 'stop';
        countDown();
    } else {
        isRunning = false;
        clearTimeout(timer);
        start.textContent = 'start';
    }
};

const countDown = () => {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
        timer = setTimeout(countDown, 1000);
    } else {
        timeLeft = 25 * 60;
        updateTimerDisplay();
        isRunning = false;
        start.textContent = 'start';
    }
};

updateTimerDisplay();
start.addEventListener('click', startTimer);