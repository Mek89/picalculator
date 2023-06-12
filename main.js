const startButtonEl = document.querySelector('#startButton');
const stopButtonEl = document.querySelector('#stopButton');
const containerEl = document.querySelector('#container');

if (window.Worker) {
    const worker = new Worker('pi-calculator.worker.js');
    const pi = String(Math.PI);
    let numberOfPi = 0;
    let calculatedNumberOfPi = 0;

    startButtonEl.addEventListener('click', function () {
        console.log('start');
        worker.postMessage('start');
    });

    stopButtonEl.addEventListener('click', function () {
        console.log('stopped');
        worker.postMessage('stop');
    });

    worker.onmessage = function (event) {
        calculatedNumberOfPi = getCalculatedNumberOfPi(pi, String(event.data));
        
        if (calculatedNumberOfPi > numberOfPi) {
            numberOfPi = calculatedNumberOfPi;
            containerEl.innerHTML = '<b>' + pi.substring(0, numberOfPi) + '</b>' + pi.substring(numberOfPi);
        }
    }
}

function getCalculatedNumberOfPi(pi, calculatedPi) {
    let i;
    for (i = 0; i < calculatedPi.length; i++) {
        console.log(i);
        if (pi.charAt(i) !== calculatedPi.charAt(i)) {
            break;
        }
    }
    console.log(i);
    return i;
}
