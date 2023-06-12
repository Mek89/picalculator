let interval;
let generator;

self.onmessage = function (event) {
    if (event.data === 'start') {
        start(self.postMessage);
    } else if (event.data === 'stop') {
        stop();
    }
}

function start(callback) {
    generator = generatePi(1, 1, 1000000);
    interval = setInterval(function () {
        callback(generator.next().value);
    }, 100);
}

function stop() {
    clearInterval(interval);
}

function* generatePi(circleRatio, squareRatio, numberOfPoint) {
    while (true) {
        circleRatio += getCircleRatio(numberOfPoint);
        squareRatio += numberOfPoint;
        yield 4 * circleRatio / squareRatio;
    }
}

function getCircleRatio(numberOfPoint) {
    const r = Number.MAX_SAFE_INTEGER;
    let x, y, z;
    let circleRatio = 0;

    for (let i = 0; i <= numberOfPoint; i++) {
        x = getRandomInteger(-r, r);
        y = getRandomInteger(-r, r);
        z = Math.sqrt(x * x + y * y);

        if (z < r) {
            circleRatio++;
        }
    }
    return circleRatio;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}