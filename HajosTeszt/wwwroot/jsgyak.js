function faktorialis(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * faktorialis(n - 1)
    }
}

function elemkiszamolo(s, o) {
    return faktorialis(s) / (faktorialis(o) * faktorialis(s - o));
}

function pascal() {
    for (let i = 0; i < 10; i++) {
        var divsor = document.createElement("div");
        divsor.id = i + ". sor";
        divsor.className = "sor";
        document.getElementById("pascal").appendChild(divsor);
        for (let j = 0; j < i + 1; j++) {
            var divelem = document.createElement("div");
            divelem.id = j + ". elem";
            divelem.className = "elem";
            divelem.innerText = elemkiszamolo(i, j);
            document.getElementById(i + ". sor").appendChild(divelem);
        }
    }
    
}

