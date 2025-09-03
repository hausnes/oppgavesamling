// Lag en funksjon som tar inn to parameter (to tall) og summerer disse
// NB: Denne kan brukes av "hvem som helst"
function summer(tall1, tall2) {
    let sum = tall1 + tall2;
    return sum;
}

// Her bruker jeg funksjonen summer for å summere arbeidstimene mine
let antallTimer = 90;
let antallVikartimer = 30;
let summertAntallTimer = summer(antallTimer, antallVikartimer);

// Utskriften kan gjøres ved å opprette HTML-elementene
let overskrift = document.createElement("h1");
overskrift.innerText = "Du har totalt jobbet " + summertAntallTimer + " timer.";
document.body.appendChild(overskrift);

// Dette er et eksempel på hvordan du kan bruke en navngitt funksjon
// når du trykker på en knapp
document.getElementById("knapp").addEventListener("click", siHei);
// document.querySelector("#knapp").addEventListener("click", siHei);

// Dette er en navngitt funksjon som "hvem som helst" kan bruke
function siHei() {
    console.log("Hei!");
}

// Dette er en ANONYM FUNKSJON
document.getElementById("knapp").addEventListener("click", function () {
    console.log("Ha det bra!")
} );

// Dette er en ANONYM ARROW FUNKSJON
document.getElementById("knapp").addEventListener("click", () => {
    console.log("Denne anonyme funksjonen kjører også.");
} );

/*
    Det siste eksempelet
*/

// Det siste eksempelet viser hvor "knotete" ting kan bli..
// Du kan ikke bruke en funksjon med parameter direkte i siste linje
function siHeiTil(navn) {
    console.log("Hei, " + navn + "!");
}

// I stedet for kan du for eksempel lage en funksjon som et "mellomsteg"
function hentNavn() {
    let navn = prompt("Hva heter du?");
    siHeiTil(navn);
}

// Kaller først på funksjonen som henter navnet, og som deretter sier hei
document.getElementById("knapp").addEventListener("click", hentNavn);