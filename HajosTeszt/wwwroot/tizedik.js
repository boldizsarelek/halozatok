var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timeoutHandler;

document.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById('előregomb').addEventListener("click", előre)
    document.getElementById('visszagomb').addEventListener("click", vissza)

    document.getElementById('válasz1').addEventListener("click", () => {
        válaszEllenőrzés(1);
    })
    document.getElementById('válasz2').addEventListener("click", () => {
        válaszEllenőrzés(2);
    })
    document.getElementById('válasz3').addEventListener("click", () => {
        válaszEllenőrzés(3);
    })
});

function init() {
    fetch('/questions/count')
        .then(result => result.text())
        .then(result => { numberOfQuestions = parseInt(result) })

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("questionsInHotList")) {
        questionsInHotList = parseInt(localStorage.getItem("questionsInHotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kérdésMegjelenítés();
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`);
                    return null;
                }
                else {
                    return result.json();
                }
            }
        )
        .then(
            result => {
                hotList[destination].question = result;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)

                if (displayedQuestion === undefined && destination === 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question

    for (var i = 0; i < 3; i++) {
        var válasz = document.getElementById("válasz" + (i + 1));
        válasz.classList.remove("helyes", "helytelen");
        válasz.style.pointerEvents = "auto";

    }

    var kérdésSzöveg = document.getElementById('kérdés_szöveg');
    var válasz1 = document.getElementById('válasz1');
    var válasz2 = document.getElementById('válasz2');
    var válasz3 = document.getElementById('válasz3');
    var kép = document.getElementById('kép1');
    var képkeret = document.getElementById('kép');

    kérdésSzöveg.innerHTML = kérdés.questionText;
    válasz1.innerHTML = kérdés.answer1;
    válasz2.innerHTML = kérdés.answer2;
    válasz3.innerHTML = kérdés.answer3;
    if (kérdés.image) {
        kép.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        képkeret.style.display = "block";
    }
    else {
        kép.src = "";
        képkeret.style.display = "none";
    }
}

function válaszEllenőrzés(válaszSzáma) {
    if (válaszSzáma === hotList[displayedQuestion].question.correctAnswer) {
        document.getElementById("válasz" + válaszSzáma).classList.add("helyes");
        hotList[displayedQuestion].goodAnswers++;
    }
    else {
        document.getElementById("válasz" + válaszSzáma).classList.add("helytelen");
        document.getElementById("válasz" + hotList[displayedQuestion].question.correctAnswer).classList.add("helyes");
        hotList[displayedQuestion].goodAnswers = 0;
    }

    for (var i = 0; i < 3; i++) {
        document.getElementById(`válasz` + (i + 1)).style.pointerEvents = "none";
    }
    
    timeoutHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("questionsInHotList", questionsInHotList);
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

function changeQuestion() {
    if (nextQuestion == numberOfQuestions + 1) {
        hotList.splice(displayedQuestion, 1);
        if (hotList.length == 0) {
            window.alert("Nincs több kérdés!");
            return;
        }
        if (displayedQuestion === hotList.length) {
            displayedQuestion--;
        }
        questionsInHotList--;
    }
    else {
        kérdésBetöltés(nextQuestion, displayedQuestion);
        nextQuestion++;
    }
    
}

function előre() {
    
    clearTimeout(timeoutHandler);
    if (hotList[displayedQuestion].goodAnswers == 3) changeQuestion()
    displayedQuestion++;   
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    localStorage.setItem("displayedQuestion", displayedQuestion);
    kérdésMegjelenítés();
}

function vissza() {
    clearTimeout(timeoutHandler);
    if (hotList[displayedQuestion].goodAnswers == 3) changeQuestion()
    displayedQuestion--;   
    if (displayedQuestion == -1) displayedQuestion = questionsInHotList - 1;
    localStorage.setItem("displayedQuestion", displayedQuestion);
    kérdésMegjelenítés();
}

