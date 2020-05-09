const buttonClick = function(e) {
    if (!clockRunning) {
        switch (this.id) {
            case 'decreasetime':
            case 'increasetime':
                updateSessionLimit(this.id);
                break;
            case 'decreasebreak':
            case 'increasebreak':
                updateBreakTime(this.id);
                break;
            case 'start':
                runClock();
                break;
        }
    }
    switch (this.id) {
        case 'stop':
            clearInterval(timer);    
            clockRunning = false;
            break;
        case 'reset':
            reset();
            break;
    }
}

const updateSessionLimit = function(type) {
    let sessionLimit = parseInt(sessionTimeLimit.textContent);
    sessionType.textContent = "Session";

    switch (type) {
        case 'decreasetime':
            if (sessionLimit > LOWER_LIMIT) {
                sessionLimit--;
            }
            break;
        case 'increasetime':
            if (sessionLimit < UPPER_LIMIT) {
                sessionLimit++;
            }
            break;
        case 'reset':
            sessionLimit = 25;
            break;
    }
    sessionTimeLimit.textContent = sessionLimit;
    timerText.textContent = timeToString(sessionLimit * 60, 0);
    updateTimerText(sessionLimit * 60);
}

const updateBreakTime = function(type) {
    let breakTime = parseInt(breakTimeLimit.textContent);
    let sessionLimit = parseInt(sessionTimeLimit.textContent);
    sessionType.textContent = "Session";
        
        switch (type) {
            case 'decreasebreak':
                if (breakTime > LOWER_LIMIT) {
                    breakTime--;
                }
                break;
            case 'increasebreak':
                if (breakTime < UPPER_LIMIT) {
                    breakTime++;
                }
                break;
            case 'reset':
                breakTime = 5;
                break;
        }
    breakTimeLimit.textContent = breakTime;
    updateTimerText(sessionLimit * 60);
}

const runClock = function() {
    let timeLeft = findNumberOfSeconds();
    clockRunning = true;

    let timer = setInterval(function() {
        if (!clockRunning) {
            clearInterval(timer);
        }
        timeLeft--;
        updateTimerText(timeLeft);
        if (timeLeft === 0) {
            changeSessionType();
            timeLeft = findNumberOfSeconds();
        }
    }, 1000)
}

const updateTimerText = function(totalSeconds) {
    timerText.textContent = timeToString(totalSeconds);
}

const timeToString = function(totalSeconds) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    let hourString = '';
    let minuteString = '';
    let secondString = '';
    
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    
    // Ensure that hours, minutes and seconds are two digits
    if (minutes < 10){
        minuteString = "0" + minutes;
    } else {
        minuteString = minutes;
    }

    if (seconds < 10) {
        secondString = "0" + seconds;
    } else {
        secondString = seconds;
    }
    
    if (hours < 10) {
        hourString = "0" + hours;
    } else {
        hourString = hours;
    }
    
    if (hours > 0) {
        return hourString + ":" + minuteString + ":" + secondString;
    } else {
        return minuteString + ":" + secondString;
    }
}

const findNumberOfSeconds = function(){
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (timerText.textContent.length === 8) {
        hours = parseInt(timerText.textContent.slice(0, 2));
        minutes = parseInt(timerText.textContent.slice(3, 5));
        seconds = parseInt(timerText.textContent.slice(6));
    } else {
        minutes = parseInt(timerText.textContent.slice(0, 2));
        seconds = parseInt(timerText.textContent.slice(3));
    }
    
    return hours * 3600 + minutes * 60 + seconds;
}

const changeSessionType = function() {
    if (sessionType.textContent === "Session") {
        sessionType.textContent = "Break";
        updateTimerText(60 * parseInt(breakTimeLimit.textContent));
    } else {
        sessionType.textContent = "Session";
        updateTimerText(60 * parseInt(sessionTimeLimit.textContent));
    }
}

const reset = function() {
    sessionType.textContent = "Session";
    clearInterval(timer);
    clockRunning = false;
    updateSessionLimit('reset');
    updateBreakTime('reset');
}

// Timer maximum values
const LOWER_LIMIT = 1;
const UPPER_LIMIT = 120;

let clockRunning = false;
let timer = true;

const sessionType = document.getElementById('sessiontype');
const sessionTimeLimit = document.getElementById('sessiontimelimit');
const breakTimeLimit = document.getElementById('breaktimelimit');
const timerText = document.getElementById('timertext');

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', buttonClick));