# Grunnleggende JavaScript - eksempelkode med forklaringer

Under er samme JavaScript-kode som i filen, men formatert og delt opp i små, forklarende seksjoner. Koden er ikke endret funksjonelt — bare dokumentert og pakket inn i kodeblokker for undervisning.

## Variabler og enkle utskrifter

Denne delen viser deklarasjon av variabler (både `let` og `const`) og enkle datastrukturer som arrays.

```javascript
let antallLiv = 100;

const NAVN = "Jo Bjørnar"; // Kan navn endres?
let navn = "Jo Bjørnar";

let arrayBilder = ["bilde1.jpg", "bilde2.jpg"];

const PI = Math.PI;
```

## Utskrift til konsoll og nettside

Eksempler på utskrift til konsoll (devtools) og til HTML-elementer.

```javascript
// Konsoll
console.log("Antall liv er: " + antallLiv + " og navnet er " + navn);
console.log(`Antall liv er: ${antallLiv} og navnet er ${navn}`);
console.table(arrayBilder);
console.warn(PI);

// Varsel (popup)
alert(PI);

// Skriv til et element med id="utskrift"
document.getElementById("utskrift").innerText = `Antall liv er ${antallLiv} og navnet er ${navn}!`;
```

## Brukerinput og beregning

Eksempel som bruker `prompt()` for å hente alder, og regner ut anslått fødselsår.

```javascript
// let alder = Number(prompt("Hvor gammel er du? "));
let alder = parseInt(prompt("Hvor gammel er du? "));
let årstall = new Date().getFullYear() - alder;
console.log("Du ble født i " + årstall + ".");
```

## Valgsetninger (if / else)

Enkel validering og tilbakemelding basert på input.

```javascript
if (alder < 0) {
    console.error("Alder kan ikke være negativ!");
} else {
    console.log("Du har en godkjent alder.");
}

document.getElementById("utskrift").innerText = "Du er " + alder + " år gammel.";

if (confirm("Press a button!")) {
    alert("You pressed OK!");
} else {
    alert("You pressed Cancel!");
}
```

## Løkker

Eksempel på `for`-løkke som teller ned antall liv.

```javascript
for (let i = 0; i < antallLiv; i++) {
    console.log("Du har " + (antallLiv - i) + " liv igjen.");
}
```

## Funksjoner

To enkle funksjoner: en uten parameter og en med parameter.

```javascript
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
```

## Manipulere stil med JavaScript

Du kan endre CSS-egenskaper direkte via DOM-objekter.

```javascript
document.body.style.backgroundColor = "lightblue";
document.getElementById("utskrift").style.color = "darkblue";
document.getElementById("utskrift").style.fontSize = "2rem";
document.getElementById("utskrift").style.border = "2px solid black";
document.getElementById("utskrift").style.padding = "1rem";
```