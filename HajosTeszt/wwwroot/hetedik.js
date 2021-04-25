var kérdés;
var aktuálisSorszám = 1;

function kérdésBetöltés(sorszám) {
    fetch(`/questions/${sorszám}`)
        .then(válaszFeldolgozás)
        .then(letöltésBefejeződött);
}

function válaszFeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function letöltésBefejeződött(d) {
    console.log('Sikeres letöltés');
    console.log(d);
    kérdés = d;
    kérdésMegjelenítés();
}

function kérdésMegjelenítés() {

    for (var i = 0; i < 3; i++) {
        document.getElementById("válasz" + (i+1)).classList.remove("helyes", "helytelen");
    }
    var kérdésSzöveg = document.getElementById('kérdés_szöveg');
    var válasz1 = document.getElementById('válasz1');
    var válasz2 = document.getElementById('válasz2');
    var válasz3 = document.getElementById('válasz3');
    var kép = document.getElementById('kép1');

    kérdésSzöveg.innerHTML = kérdés.questionText;
    válasz1.innerHTML = kérdés.answer1;
    válasz2.innerHTML = kérdés.answer2;
    válasz3.innerHTML = kérdés.answer3;
    if (kérdés.image == "") {
        kép.src = "";
    }
    else kép.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
}

function válaszEllenőrzés(válaszSzáma) {
    if (válaszSzáma == kérdés.correctAnswer) {
        document.getElementById("válasz" + válaszSzáma).classList.add("helyes");
    }
    else document.getElementById("válasz" + válaszSzáma).classList.add("helytelen");
}

window.onload = function () {
    kérdésBetöltés(aktuálisSorszám);
    
    document.getElementById('előregomb').addEventListener("click", () => {
        /*if (aktuálisSorszám < kérdés.length - 1) {
            aktuálisSorszám++;
        }
        else aktuálisSorszám = 0;*/
        aktuálisSorszám++;
        kérdésBetöltés(aktuálisSorszám);
    })

    document.getElementById('visszagomb').addEventListener("click", () => {
        /*if (aktuálisSorszám > 0) {
            aktuálisSorszám--;
        }
        else aktuálisSorszám = kérdés.length - 1;*/
        aktuálisSorszám--;
        kérdésBetöltés(aktuálisSorszám);
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