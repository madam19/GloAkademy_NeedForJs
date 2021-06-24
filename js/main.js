'use strict';


const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRigth: false,
    ArrowLeft: false

};
const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;

        }
    });
}

function playGame() {

    if (setting.start) {
        moveRoad();
        if (keys.ArrowLeft && setting.x > 0) { //изменение координат, если нажата клавиша
            setting.x -= setting.speed;
        }
        if (keys.ArrowRigth && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeigth - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUP && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px'; // передаем изменные данные
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }

}

function getQuantityElements(heigthElement) {
    return document.documentElement.clientHeight / heigthElement + 1;

}

function startGame() {
    start.classList.add('hide'); //начало игры, убирает запись с экрана

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100 + 'px';
        gameArea.appendChild(line);


    }
    setting.start = true;
    gameArea.appendChild(car); // car
    setting.x = car.offsetLeft; // positon car
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}




function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;


}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}






car.classList.add('car');
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyesc', stopRun);