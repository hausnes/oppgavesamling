const skjema = document.querySelector("#skjema");

skjema.addEventListener("submit", sjekkDifferanse);

function sjekkDifferanse(evt) {
    evt.preventDefault();

    let stad1Lengde = document.querySelector("#stad1").value.length;
    let stad2Lengde = document.querySelector("#stad2").value.length;
    let differanse = Math.abs(stad1Lengde - stad2Lengde);

    document.querySelector("#utskrift").innerText = "Differansen er " +  differanse + " antall teikn.";
}