## Variabler

I JavaScript bruker vi vanligvis `let` og `const` for å erklære variabler:

- `const` — for konstanter (verdi som ikke endres). Bruk når verdien ikke skal settes om.
- `let` — for variabler som kan endres senere.

Eksempel:

```js
const PI = 3.14159;
let navn = "Jo Bjørnar";
let alder = 17;
```

Tips om navngivning: bruk camelCase (f.eks. `antallBarn`, `brukerNavn`).

## Utskrift / logging

Unngå `document.write()` i moderne kode — det er lite fleksibelt og kan overskrive siden. Bruk heller:

- `console.log(...)` for utviklerlogg i konsollen
- `document.getElementById('id').innerText` eller `.textContent` for å vise tekst i DOM
- `document.querySelector('nav').innerText` som et kraftigere alternativ til `getElementById`  

Eksempel:

```js
let pris = 43.99;
console.log('Prisen er ' + pris + ' kr.');
// eller med template literals (anbefalt)
console.log(`Prisen er ${pris} kr.`);

// vise i en side (forutsetter <div id="utskrift"></div> i HTML)
document.getElementById('utskrift').innerText = `Prisen er ${pris} kr.`;
```

## Datatyper

Noen vanlige datatyper i JavaScript:

- Number: både hele tall og desimaler (f.eks. `3` og `3.14`)
- String: tekst, enten med doble eller enkle anførselstegn (`"tekst"` eller `'tekst'`)
- Boolean: `true` eller `false`

Eksempler og tekst-manipulasjon:

```js
let navn = "Jo Bjørnar";
console.log(navn[0]); // 'J'
console.log(navn.indexOf('J')); // 0
console.log(navn.indexOf('å')); // -1 (ikke funnet)
console.log(navn.toLowerCase()); // 'jo bjørnar'
console.log(navn.toUpperCase()); // 'JO BJØRNAR'
console.log(navn.length); // antall tegn, f.eks. 10
console.log(navn.substring(0, 2)); // 'Jo' (fra indeks 0 til 2, ikke inkludert 2)

let over18 = true;
```

Merk: strings er immutable — du kan ikke gjøre `navn[0] = 'J'` for å endre et tegn.

## Operatorer og regneoperasjoner

Grunnleggende aritmetikk:

```js
let sum = 4 + 8;
let differanse = 9 - 6;
let produkt = 8 * 7;
let kvotient = 15 / 3;
```

Operatorer for å oppdatere variabler:

- `+=`, `-=`, `*=`, `/=` (f.eks. `a += 3` betyr `a = a + 3`)
- `++` og `--` for å øke eller minke med 1 (`a++`, `a--`)

Parenteser styrer rekkefølgen:

```js
let antallBarn   = 8;
let antallVoksne = 8;
let brusPerGjest = 2;
let antallBrusFeil   = antallBarn + antallVoksne * brusPerGjest; // 8 + 8*2 = 24
let antallBrusRiktig = (antallBarn + antallVoksne) * brusPerGjest; // (8+8)*2 = 32
```

Tabell (kort oversikt):

- `+` addisjon
- `-` subtraksjon
- `*` multiplikasjon
- `/` divisjon
- `%` modulus (rest)
- `++` inkrement
- `--` dekrement

## Inkrement og dekrement (eksempler)

```js
let antallLiv = 100;
antallLiv = antallLiv - 1; // 99
antallLiv -= 1;           // 98
antallLiv--;              // 97

antallLiv = antallLiv + 1; // 98
antallLiv += 1;            // 99
antallLiv++;               // 100
```

Vær klar over pre- og post-inkrement når det brukes i uttrykk:

```js
let a = 5;
console.log(a++); // skriver 5, så a blir 6
console.log(++a); // a blir 7, skriver 7
```

## Modulus (rest)

`a % b` gir resten når `a` deles på `b`:

```js
let rest1 = 9 % 3; // 0
let rest2 = 8 % 3; // 2
```

Brukes ofte for å sjekke om et tall er partall/parodd (`n % 2 === 0` betyr partall).

## typeof

`typeof` forteller datatypen til en verdi:

```js
let tekst = "litt tekst";
console.log(typeof tekst); // 'string'
let tall  = 17;
console.log(typeof tall); // 'number'
let tallString = "17";
console.log(typeof tallString); // 'string'
let arrayBilder = ["bilde1.jpg", "bilde2.jpg"];
console.log(typeof arrayBilder); // 'object'
```

## Konvertere mellom string og number

Noen nyttige funksjoner:

- `Number.isInteger(x)` — sjekker om `x` er et heltall
- `parseInt(str)` — konverterer en streng til heltall (stopper ved første ikke-siffer)
- `parseFloat(str)` — konverterer en streng til flyttall
- `parseInt(str, base)` — kan tolke strenger i forskjellige baser (f.eks. base 2 for binært, base 16 for heksadesimalt)
- `Number(str)` — konverterer hele strengen til et tall eller `NaN` hvis ugyldig

Eksempler:

```js
let tall = 3.14;
console.log('tall er eit heiltal: ' + Number.isInteger(tall)); // false
tall = parseInt(tall);
console.log('tall er eit heiltal: ' + Number.isInteger(tall)); // true (3)

let bin = '1011';
console.log(parseInt(bin, 2)); // 11

console.log(parseFloat('3.14')); // 3.14
console.log(parseFloat('3. 14')); // 3 (stopp på mellomrom)

console.log(Number('3.14')); // 3.14
console.log(Number('abc')); // NaN
```