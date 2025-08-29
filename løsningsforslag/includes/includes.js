const utdata = document.getElementById("utdata");

const skjema = document.getElementById("skjema");

skjema.addEventListener("submit", lesMelding);

function lesMelding(evt) {
    evt.preventDefault(); // SPA (single page application) = går ikkje til side 2 for å håndtere det

    let inndata = document.getElementById("chatInn").value;
    console.log(inndata);

    if (inndata.toLowerCase().includes("chips")) {
        utdata.innerText = "Å, eg og likar chips.";
    } else {
        utdata.innerText = "Me er ikkje kompatible.";
    }
}