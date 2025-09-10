/* 
    -------------------------------------------------------------------
    NB: 
    Dette dokumentet inneholder utdatert kode, som var og onclick.
    Hovedpoenget er likevel at du ser denne koden blir mye mer tungvint
    å jobbe med enn den dynamiske koden (i matbutikk-dynamisk).
    
    -------------------------------------------------------------------
*/

var knappGulrot = document.getElementById("knappGulrot");
var knappRodlok = document.getElementById("knappRodlok");
var knappAgurk = document.getElementById("knappAgurk");

knappAgurk.onclick = knappGulrot.onclick = knappRodlok.onclick = f_leggTilVare;

var totalPris = 0;
var antAgurk = 0; var prisTotalAgurk = 0;
var antRodlok = 0; var prisTotalRodlok = 0;
var antGulrot = 0; var prisTotalGulrot = 0;

function f_leggTilVare(evt){
    let vare = evt.target;
    let varePris = Number(vare.getAttribute("data-pris")); // Gjer 'data-pris', som  er ein String, om til Number
    let vareNavn = vare.getAttribute("data-varenavn");
    
    switch(vareNavn){
        case "Gulrot":
            antGulrot++;
            prisTotalGulrot = antGulrot * varePris;
            break;
        case "Rodlok":
            antRodlok++;
            prisTotalRodlok = antRodlok * varePris;
            break;
        case "Agurk":
            antAgurk++;
            prisTotalAgurk = antAgurk * varePris;
            break;
        default:
            console.log("Feilmelding i switch.");
            break;
    }

    console.log("Vare: " + vareNavn + ", pris: " + varePris); // Kontrollerer om registrerte data er korrekt
    console.log(isNaN(varePris)); // Kontrollerer datatype
    totalPris = totalPris + varePris;
    console.log(totalPris);

    // Kallar på ein eigen funksjon som skriv ut oppsummeringa
    f_oppsummer(antAgurk, antGulrot, antRodlok);
}

var handlekorg = document.getElementById("handlekurvInnhold");

function f_oppsummer(antAgurk, antGulrot, antRodlok){
    handlekorg.innerHTML = "";
    if(antAgurk != 0){
        handlekorg.innerHTML += antAgurk + " x agurk = " + prisTotalAgurk.toFixed(2) + ".<br>";
    }
    if(antGulrot != 0){
        handlekorg.innerHTML += antGulrot + " x gulrot = " + prisTotalGulrot.toFixed(2) + ".<br>";
    }
    if(antRodlok != 0 ){
        handlekorg.innerHTML += antRodlok + " x rødløk = " + prisTotalRodlok.toFixed(2) + ".<br>";
    }
    handlekorg.innerHTML += "Totalpris: " + totalPris.toFixed(2);
}