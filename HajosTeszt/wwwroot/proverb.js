var proverbCount; //szólások száma
var proverbs = []; //összes szólás
var currentid; //kijelölt szólás sorszáma

document.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {

    getProverbs();

    //hozzáadás
    document.getElementById("addButton").addEventListener("click", () => {
        addProverb();
    });

    //törlés
    document.getElementById("deleteButton").addEventListener("click", () => {
        deleteProverb();      
    });
}

//szólások, és azok számának betöltése, megjelenítése
function getProverbs() {
    fetch('api/proverbs/count')
        .then(result => result.text())
        .then(result => {
            proverbCount = parseInt(result);
        })
        .then(() => {
            fetch(`api/proverbs`)
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    proverbs = result;
                    showProverbs();
                })
        })     
}

//szólás hozzáadása
function addProverb() {
    if (document.getElementById("proverbText").value) {
        let data = {
            proverbText: document.getElementById("proverbText").value
        };

        fetch("api/proverbs", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(x => {
                if (x.ok) {
                    console.log("Elem sikeresen hozzáadva");
                    getProverbs();
                }
                else
                    console.log("Elem hozzáadása nem sikerült");
            });
    }
}

//szólás törlése
function deleteProverb() {
    if (currentid) {
        var id = proverbs[currentid].proverbId;
        proverbs.splice(currentid);

        fetch(`api/proverbs/${id}`, {
            method: 'DELETE',
        })
            .then(x => {
                if (x.ok) {
                    console.log("Elem sikeresen törölve");
                    getProverbs();
                }
                else
                    console.log("Elem törlése nem sikerült");
            });
    } 
}

//szólások megjelenítése
function showProverbs() {
    currentid = null;
    document.getElementById("listing").innerHTML = null;
    for (var i = 0; i < proverbCount; i++) {
        var proverb = document.createElement("div");
        proverb.id = i;
        proverb.classList = "proverb";
        proverb.innerText = proverbs[i].proverbText;
        document.getElementById("listing").appendChild(proverb);

        proverb.addEventListener("click", (event) => {
            var selectedProverb = event.target;
            if (currentid) {
                document.getElementById(currentid).classList = "proverb";
            }
            selectedProverb.classList = "selected";
            currentid = selectedProverb.id;
            displaySelectedItem();
        });
    }
    displaySelectedItem();
}

//kiválasztott elem megjelenítése
function displaySelectedItem() {
    if (currentid) document.getElementById("actual").innerText = document.getElementById(currentid).innerText;
    else document.getElementById("actual").innerText = "Válassz ki egy törlendő elemet!";
}