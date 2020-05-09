const buttonPress = function(e) {
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
            console.log("Start");
            break;
        case 'stop':
            console.log("Stop");
            break;
        case 'reset':
            console.log("Reset");
            break;
    }
}

const updateSessionLimit = function(type) {
    let sessionLimit = parseInt(sessionTimeLimit.textContent);

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
    }
    sessionTimeLimit.textContent = sessionLimit;
    updateTimerText(timeToString(sessionLimit, 0));
}

const updateBreakTime = function(type) {
    let breakTime = parseInt(breakTimeLimit.textContent);
        
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
        }
    breakTimeLimit.textContent = breakTime;
}

const updateTimerText = function(timeString) {
    timerText.textContent = timeString;
}

const timeToString = function(minutes, seconds) {
    let minuteString;
    let secondString;

    // Ensure that minutes and seconds are two digits
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
    return minuteString + ":" + secondString;
}

// Timer maximum values
const LOWER_LIMIT = 1;
const UPPER_LIMIT = 99;

const sessionTimeLimit = document.getElementById('sessiontimelimit');
const breakTimeLimit = document.getElementById('breaktimelimit');
const timerText = document.getElementById('timertext');

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', buttonPress));