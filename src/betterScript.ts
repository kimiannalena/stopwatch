window.onload = function () {

    /****** variables *****/
    let seconds: number = 0;
    let tens: number = 0;
    const appendTens = document.getElementById("tens");
    const appendSeconds = document.getElementById("seconds");
    const buttonStart = document.getElementById('start-btn');
    const buttonLap = document.getElementById('lap-btn');
    const buttonStop = document.getElementById('stop-btn');
    const buttonReset = document.getElementById('reset-btn');
    const lapList = document.getElementById('laps');
    let lapCounter = 1;
    let Interval;

    /****** callback *****/
    buttonStart.onclick = function() {
        try {
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
        } catch (e) {
            console.log(e);
        }
    }

    buttonLap.onclick = function() {
        try {
            createRound()
            storeLaps();
        } catch (e) {
            console.log(e);
        }
    }

    buttonStop.onclick = function() {
        try {
            clearInterval(Interval);
        } catch (e) {
            console.log(e);
        }
    }

    buttonReset.onclick = function() {
        try {
            clearInterval(Interval);
            reset();
            storeLaps();
        } catch (e) {
            console.log(e);
        }

    }

    /****** functions *****/
    function createRound() {
        lapList.innerHTML +=
            '<li> <span class="lap-seconds">'
            + appendSeconds.innerHTML
            + '</span>:<span class="lap-tens">'
            + appendTens.innerHTML + '</span> -- Lap '
            + lapCounter +'</li>';

        lapCounter++;
    }

    function reset() {
        // @ts-ignore
        tens = "00";
        // @ts-ignore
        seconds = "00";
        appendTens.innerHTML = String(tens);
        appendSeconds.innerHTML = String(seconds);
        lapList.innerHTML = "";
        lapCounter = 1;
    }

    function startTimer () {
        tens++;

        // !works, but glitches during seconds...
        // appendTens.innerHTML = (tens < 9) ? appendTens.innerHTML = "0" + tens : appendTens.innerHTML = String(tens);

        if(tens < 9){
            appendTens.innerHTML = "0" + tens;
        }
        if (tens > 9){
            appendTens.innerHTML = String(tens);
        }
        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9){
            appendSeconds.innerHTML = String(seconds);
        }
    }

    function storeLaps() {
        window.localStorage.myLaps = lapList.innerHTML;
    }

    function getLaps(){
        lapList.innerHTML = window.localStorage.myLaps;
    }
    getLaps();

}
