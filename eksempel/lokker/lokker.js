let arrayNavn = [
    "Jo Bjørnar",
    "Jo Bjarne",
    "Jo Roger",
    "Jo Annette",
    "Jonny Bonny",
    "Johannes"
];

// Her er tre måter å skrive løkker på.

for (let index = 0; index < arrayNavn.length; index++) {
    console.log(arrayNavn[index]);
}

for (let navn of arrayNavn) {
    console.log(navn);
}

let i = 0;
while (i < arrayNavn.length) {
    console.log(arrayNavn[i]);
    i = i + 1;
}