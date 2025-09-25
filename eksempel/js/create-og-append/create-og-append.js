const overskrift = document.createElement("h1");
overskrift.innerText = "Dette er en overskrift.";
document.body.appendChild(overskrift);

const knapp1 = document.createElement("button");
knapp1.innerText = "Trykk på meg!";
knapp1.id = "knapp1";
knapp1.addEventListener("click", trykk);
document.body.appendChild(knapp1);

const knapp2 = document.createElement("button");
knapp2.innerText = "Trykk på meg!";
knapp2.id = "knapp2";
knapp2.addEventListener("click", trykk);
knapp2.style.backgroundColor = "red";
knapp2.style.padding = "2rem";
document.body.appendChild(knapp2);

function trykk(evt) {
    console.log(evt.target.id); // For å kunne skille mellom hvilken knapp som ble brukt
}

const bilde = document.createElement("img");
bilde.src = "../../bilder/skryt.png";
bilde.id = "bilde";
document.body.appendChild(bilde);