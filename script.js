// Получение объектов страницы
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");

const light1 = document.getElementById("light1");
const light2 = document.getElementById("light2");
const light3 = document.getElementById("light3");

const buttonRun = document.getElementById("button");

const check = document.getElementById("check");
const historyText = document.getElementById("historyText");
const history = document.getElementById("history");

const mainDivForm = document.getElementById("form");
const mainForm = document.forms.main;

const welcome1 = document.getElementById("welcome1");
const welcome2 = document.getElementById("welcome2");

const container = document.getElementById("container");

const exitFon = document.getElementById("exitFon");
const exit = document.getElementById("exit");
const close1 = document.getElementById("close");
const exitText = document.getElementById("exitText");


// Форма
mainForm.buttonF.onclick = (event) => {
    if (mainForm.nameF.value != "") {
        event.preventDefault();
        let name = mainForm.nameF.value;

        welcome1.style.display = "none";
        welcome2.innerHTML = `Привет, ${name} !`;

        exitText.innerHTML = `
            Уже уходите? <br><br>
            Прощайте, ${name}! <br><br>
            Спасибо, что были с нами!
        `;

        mainDivForm.style.display = "none";
        container.style.display = "flex";
    }
}

// Объявление переменных
let a;
let b;
let c;
let interval;
let willRan = 0;
let milliseconds = 0;
let rotation = 0;
let numberVictories = 0;
let balance = 5000;
let income = 0;
let userOut = false;

const arr = ["img/C++.png", "img/CSS.png", "img/HTML.png", "img/JS.png", "img/PHP.jpg", "img/python.png", "img/вишня.jpg"];
const arrTeg = ["C++", "CSS", "HTML", "JS", "PHP", "python", "вишня"];
let arrHistory = [
    [],
    [],
    [],
    []
];

// Обновление результатов
function updateResult() {
    if ((slot1.src == slot3.src)) {
        light1.style.background = "green";
        light3.style.background = "green";
    }

    if (slot2.src == slot3.src) {
        light2.style.background = "green";
        light3.style.background = "green";
    }

    numberVictories = [light1.style.background == "green", light2.style.background == "green", light3.style.background == "green"].filter((value) => value).length;
    console.log(typeof (numberVictories));
    switch (numberVictories) {
        case 0: {
            balance += 0;
            income = 0;
            break;
        }
        case 2: {
            balance += 1000;
            income = 1000;
            check.innerText = "Ставка: 500 рубㅤㅤВаш счёт: " + balance + " руб";
            break;
        }
        case 3: {
            balance += 10000;
            income = 10000;
            check.innerText = "Ставка: 500 рубㅤㅤВаш счёт: " + balance + " руб";
            break;
        }
    }

    willRan = 0;
    if (balance >= 500) {
        buttonRun.style.background = "rgb(85, 125, 255)";
    }


    // Обновление истории
    historyText.style.display = "block";
    arrHistory[0].unshift(arrTeg[a]);
    arrHistory[1].unshift("   |   " + arrTeg[b]);
    arrHistory[2].unshift("   |   " + arrTeg[c]);
    arrHistory[3].unshift("   |   " + income);

    history.innerHTML = `
    <div class="colonHistory">${arrHistory[0].join("\n")}</div>
    <div class="colonHistory">${arrHistory[1].join("\n")}</div>
    <div class="colonHistory">${arrHistory[2].join("\n")}</div>
    <div>${arrHistory[3].join("\n")}</div>`;
}

// Старт игры
buttonRun.addEventListener("click", () => {

    if (balance >= 500) {

        if (willRan == 0) {
            willRan = 1;

            light1.style.background = "red";
            light2.style.background = "red";
            light3.style.background = "red";

            buttonRun.style.background = "gray";

            balance -= 500;
            check.innerText = "Ставка: 500 рубㅤㅤВаш счёт: " + balance + " руб";

            // Запуск прокрутки
            interval = setInterval(() => {

                milliseconds++;

                if (milliseconds > 20) {
                    if (rotation < 10) {
                        a = Math.floor(Math.random() * arr.length);
                        slot1.src = arr[a];
                    }
                    if (rotation < 20) {
                        b = Math.floor(Math.random() * arr.length);
                        slot2.src = arr[b];
                    } else {
                        if (slot1.src == slot2.src) {
                            light1.style.background = "green";
                            light2.style.background = "green";
                        }
                    }
                    if (rotation < 30) {
                        rotation++;
                        c = Math.floor(Math.random() * arr.length);
                        slot3.src = arr[c];
                    } else {
                        clearInterval(interval);

                        updateResult();

                        rotation = 0;
                    }

                    milliseconds = 0;
                    console.log(rotation);
                }
            }, 5);
        }
    }
})

// Прощание перед уходом


container.addEventListener("mouseleave", () => {
    if (userOut != true) {
        userOut = true;
        exitFon.style.display = "block";
        exit.style.display = "block";
    }
});


close1.addEventListener("click", () => {
    exitFon.style.display = "none";
    exit.style.display = "none";
})