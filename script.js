const timerElement = document.getElementById('pomodoro-time');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const breakButton = document.getElementById('break');
let timeLeft;
let timer;
let isRunning = false;
let mode = "pomodoro"; 

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
        stopTimer();
    }
};

const stopTimer = () => {
    isRunning = false;
    clearTimeout(timer);
    start.textContent = 'start';
};

const countDown = () => {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
        timer = setTimeout(countDown, 1000);
    } else {
        resetTimer();
    }
};

const resetTimer = () => {
    stopTimer();
    if (mode === 'pomodoro') {
        timeLeft = 25 * 60;
    } else {
        timeLeft = 5 * 60;
    }
    updateTimerDisplay();
};

const switchMode = (newMode) => {
    stopTimer();
    mode = newMode;
    resetTimer();
    pomodoroButton.classList.toggle('active', mode === 'pomodoro');
    breakButton.classList.toggle('active', mode === 'break');
};

resetTimer();
start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);
pomodoroButton.addEventListener('click', () => switchMode('pomodoro'));
breakButton.addEventListener('click', () => switchMode('break'));