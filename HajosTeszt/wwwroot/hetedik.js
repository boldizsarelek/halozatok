var kérdések;
var aktuálisSorszám = 0;

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    console.log('Sikeres letöltés');
    kérdések = d;
    kérdésmegjelenítés(aktuálisSorszám);
}

function kérdésmegjelenítés(kérdésSorszám) {

    for (var i = 0; i < 3; i++) {
        document.getElementById("válasz" + (i+1)).classList.remove("helyes", "helytelen");
    }
    var kérdés = document.getElementById('kérdés_szöveg');
    var válasz1 = document.getElementById('válasz1');
    var válasz2 = document.getElementById('válasz2');
    var válasz3 = document.getElementById('válasz3');
    var kép = document.getElementById('kép1');

    kérdés.innerHTML = kérdések[kérdésSorszám].questionText;
    válasz1.innerHTML = kérdések[kérdésSorszám].answer1;
    válasz2.innerHTML = kérdések[kérdésSorszám].answer2;
    válasz3.innerHTML = kérdések[kérdésSorszám].answer3;
    kép1.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdésSorszám].image;
}

function válaszEllenőrzés(válaszSzáma) {
    if (válaszSzáma == kérdések[aktuálisSorszám].correctAnswer) {
        document.getElementById("válasz" + válaszSzáma).classList.add("helyes");
    }
    else document.getElementById("válasz" + válaszSzáma).classList.add("helytelen");
}

window.onload = function () {
    letöltés();
    
    document.getElementById('előregomb').addEventListener("click", () => {
        if (aktuálisSorszám < kérdések.length - 1) {
            aktuálisSorszám++;
        }
        else aktuálisSorszám = 0;
        kérdésmegjelenítés(aktuálisSorszám);
    })

    document.getElementById('visszagomb').addEventListener("click", () => {
        if (aktuálisSorszám > 0) {
            aktuálisSorszám--;
        }
        else aktuálisSorszám = kérdések.length - 1;
        kérdésmegjelenítés(aktuálisSorszám);
    })

    document.getElementById('válasz1').addEventListener("click", () => {
        válaszEllenőrzés(1);
    })

    document.getElementById('válasz2').addEventListener("click", () => {
        válaszEllenőrzés(2);
    })

    document.getElementById('válasz3').addEventListener("click", () => {
        válaszEllenőrzés(3);
    })
}