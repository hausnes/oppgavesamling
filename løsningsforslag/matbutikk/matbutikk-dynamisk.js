// Henter HTML-elementene
//let handlekurvEl = document.querySelector("#handlekurv");
let handlekurvEl = document.getElementById("handlekurv");
//let varerEl = document.querySelector("#varer");
let varerEl = document.getElementById("varer");

// Vareoversikt
let varer = [
    { navn: "Gulrot", pris: 14.90, bilde: "mat_19.png", handlekurv: 0 },
    { navn: "Rødløk", pris: 8.30, bilde: "mat_01.png", handlekurv: 0 },
    { navn: "Agurk", pris: 12.90, bilde: "mat_14.png", handlekurv: 0 },
    { navn: "Paprika", pris: 13.30, bilde: "mat_05.png", handlekurv: 0 },
    { navn: "Potet", pris: 3.90, bilde: "mat_13.png", handlekurv: 0 },
    { navn: "Tomat", pris: 4.90, bilde: "mat_08.png", handlekurv: 0 }
];

// Lager div-elementer som viser fram varene
for (var i = 0; i < varer.length; i++) {
    // Lager et div-element
    var varediv = document.createElement("div");
    varediv.className = "vare";

    // Lager overskrift for varen
    vareoverskrift = document.createElement("h3");
    vareoverskrift.innerHTML = varer[i].navn;

    // Lager et img-element for varen
    varebilde = document.createElement("img");
    varebilde.src = "mat/" + varer[i].bilde;

    // Lager et p-element med pris for varen
    varepris = document.createElement("p");
    varepris.innerHTML = varer[i].pris + " kr";

    // Lager en knapp for å kjøpe varen
    vareknapp = document.createElement("button");
    vareknapp.innerHTML = "Kjøp";
    vareknapp.id = i;
    vareknapp.addEventListener("click", kjopVare);

    // Legger til alle elementene i div-elementet til varen
    varediv.appendChild(vareoverskrift);
    varediv.appendChild(varebilde);
    varediv.appendChild(varepris);
    varediv.appendChild(vareknapp);

    // Legger til div-elementet i elementet med alle varene
    varerEl.appendChild(varediv);
}

// Funksjon som legger til en vare i handlekurven
function kjopVare(e) {
    // Henter varenummeret
    var varenummer = e.target.id;

    // Øker antall i handlekurven med én
    varer[varenummer].handlekurv++;

    // Kaller funksjonen oppdaterHandlekurv som oppdaterer handlekurven
    oppdaterHandlekurv();
}

// Funksjon som oppdater handlekurven
function oppdaterHandlekurv() {
    // Variabel for å holde orden på totalpris
    var totalpris = 0;

    // Tømmer handlekurv-elementet, og legger til overskriften
    handlekurvEl.innerHTML = "<h3> Handlekurv </h3>";

    // Går gjennom alle varene og ser om det er noen i handlekurven
    for (var i = 0; i < varer.length; i++) {
        if (varer[i].handlekurv > 0) {
        // Variabel for prisen av varen (ved kjøp av flere av én vare)
        var varepris = varer[i].pris * varer[i].handlekurv;

        // Oppdaterer totalprisen
        totalpris += varepris;

        // Skriver ut informasjon om varen
        handlekurvEl.innerHTML += "<p> " + varer[i].handlekurv + " x " + varer[i].navn + " (" + varepris.toFixed(2) + " kr)" + "</p>";
        }
    }

    // Skriver ut totalprisen
    handlekurvEl.innerHTML += "Totalpris: " + totalpris.toFixed(2) + " kr.";
}