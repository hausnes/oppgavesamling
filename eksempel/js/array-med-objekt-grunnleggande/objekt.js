// Begynner med grunnleggende array
console.log("Grunnleggende array med navn:");
let arrayNavn = ["Ola", "Kari", "Per"];
console.log("Hele den grunnleggende arrayen med navn:");
console.log(arrayNavn);

console.log("Ett og ett navn fra arrayen med navn:");
for (let navn of arrayNavn) {
    console.log(navn);
}

console.log("Skriver ut en gitt person (gitt indeks, her 1) fra arrayen med navn:");
console.log(arrayNavn[1]); // Skriver ut elementet med indeks lik 1 (Kari)

// Et enkelt objekt, gjerne med ekstra informasjon (yrke)
let person = {
    navn: "Olaien",
    alder: 250,
    yrke: "Utvikler"
};

console.log("\nAll informasjon om et objekt:");
console.log(person);
console.log("Bare navnet fra et objekt:");
console.log(person.navn);

// En samling/array med mange ulike objekter
let arrayPersoner = [
    {
        navn: "Ola",
        alder: 25,
    },
    {
        navn: "Kari",
        alder: 30,
    },
    {
        navn: "Per",
        alder: 28,
    }
];

console.log("\nArrayen med objekt:");
console.log(arrayPersoner); // Hele
console.log("Bare en gitt person (all info):");
console.log(arrayPersoner[1]); // All informasjon om en gitt person
console.log("Utvalgt informasjon om en gitt person:");
console.log(arrayPersoner[1].navn); // Bestemt informasjon om en gitt person

arrayPersoner.push(person); // Legger til en ny person, sjekk linje 13 lenger oppe.
// Sjekker om "Olaien" er lagt til
console.log("\nSjekker om 'Olaien' er lagt til.");
for (let person of arrayPersoner) {
    console.log(person.navn);
}

// Oppgave: Finn alle personene som er 30 år eller mer, og fjern de fra arrayen
console.log("\nHer kommer alle personene i arrayen, som er over 30:");

console.log("\nFor-løkke, versjon 1:");
for (let person of arrayPersoner) {
    if (person.alder >= 30) {
        console.log("Fant person på 30 eller mer: " + person.navn);
    }
}

console.log("\nFor-løkke, versjon 2:");
for (let index = 0; index < arrayPersoner.length; index++) {
    if (arrayPersoner[index].alder >= 30) {
        console.log("Fjerner nå: " + arrayPersoner[index].navn); 
        arrayPersoner.splice(arrayPersoner[index], 1);
    }
}

// Sjekker om alle er fjernet
console.log("\nDe som er igjen etter sletting:");

for (let person of arrayPersoner) {
    console.log(person.navn);
}