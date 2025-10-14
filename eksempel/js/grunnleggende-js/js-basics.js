// Variabler og enkle utskrifter

let antallLiv = 100;

const NAVN = "Jo Bjørnar";
let navn = "Jo Bjørnar"; // vanlig variabel

let arrayBilder = ["bilde1.jpg", "bilde2.jpg"];

const PI = Math.PI;

// Utskrift til konsoll og nettside

console.log("Antall liv er: " + antallLiv + " og navnet er " + navn);
console.log(`Antall liv er: ${antallLiv} og navnet er ${navn}`);
console.table(arrayBilder);
console.warn(PI);

alert(PI);

document.getElementById("utskrift").innerText = `Antall liv er ${antallLiv} og navnet er ${navn}!`;

// let alder = Number(prompt("Hvor gammel er du? "));
let alder = parseInt(prompt("Hvor gammel er du? "));
let årstall = new Date().getFullYear() - alder;
console.log("Du ble født i " + årstall + ".");

// Valgsetninger (if-else)

if (alder < 0) {
    console.error("Alder kan ikke være negativ!");
}
else {
    console.log("Du har en godkjent alder.");
}

document.getElementById("utskrift").innerText = "Du er " + alder + " år gammel.";

if (confirm("Press a button!")) {
    alert("You pressed OK!");
} else {
    alert("You pressed Cancel!");
}

// Løkker

for (let i = 0; i < antallLiv; i++) {
    console.log("Du har " + (antallLiv - i) + " liv igjen.");
}

// Funksjoner

function siHei() {
    alert("Hei!");
}

siHei();
siHei();

function siHeiTilNavn(navn) {
    alert("Hei, " + navn + "!");
}

siHeiTilNavn("Jo Bjørnar");
siHeiTilNavn("Ola Nordmann");

// Du kan manipulere CSS med JS

document.body.style.backgroundColor = "lightblue";
document.getElementById("utskrift").style.color = "darkblue";
document.getElementById("utskrift").style.fontSize = "2rem";
document.getElementById("utskrift").style.border = "2px solid black";
document.getElementById("utskrift").style.padding = "1rem";