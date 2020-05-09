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
    updateTimerText(timeToString(sessionLimit * 60, 0));
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

// Timer maximum values
const LOWER_LIMIT = 1;
const UPPER_LIMIT = 120;

const sessionTimeLimit = document.getElementById('sessiontimelimit');
const breakTimeLimit = document.getElementById('breaktimelimit');
const timerText = document.getElementById('timertext');

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', buttonPress));