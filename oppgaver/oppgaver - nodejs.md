# Oppgavesamling for Node JS og Express
[Tilbake til samleside](../README.md)

## Oppgåve 1 – starte prosjekt, og ruter
- Opprett eit express-prosjekt. Bruk npm for å initialisere prosjektet.
- Installer pakken express.
- Opprett app.js.
- Lag grunnleggande rute til rot (/) – send «Testside fungerer» som resultat til den som besøker.
- Lag grunnleggande rute til ei public-mappe og ei side der (HTML, CSS, JS) – bruk «sendFile».
- Lat serveren lytte på localhost, port 3000.
- Kontroller at rutene du har oppretta fungerer ved å besøke localhost:3000 i nettlesaren. Besøk dei ulike undersidene/rutene.
- Lag fleire ruter og besøk desse for å teste at alt fungerer, og at du forstår kva som skjer.

Bruk eigne ord og forklar/diskuter (gjerne med ein nabo, eller lærar).

## Oppgåve 2 – SQL og database
- Opprett ein database. Bruk SQL eller https://sqlitestudio.pl/ for å lage ein enkel db med ein enkelt tabell «bruker». Den skal innehalde brukarid, epost, namn og passord. Fyll inn med eksempeldata, minst 3 stk. brukarar.
- Installer pakken better-sqlite3 i Node-prosjektet ditt.
- Lag ei rute i app.js som hentar ut all informasjonen frå databasen vha. ein spørring, og viser denne fram, gjerne som rein JSON no i første omgang.

…

## Oppgåve 3 – Generere HTML frå JSON
Me tek utgangspunkt i ruta frå oppgåve 2 som returnerte ei JSON-fil.

Lag eit HTML-dokument i public-mappa som du kallar `brukere.html`.

Hent JSON frå oppg. 2 (hugs `async function` og `await`), og generer nødvendig HTML (`createElement` og `appendChild`). HTML-en treng ikkje vere så avansert, du kan til dømes ha namn som `h1` og e-post som `p` rett under.

Tips til utviding: Legg til profilbilete for brukaren. Korleis er det best å handtere dette?

…

## Oppgåve 4 – Opprette ein brukar via nettside
Lag ei nettside som gjer det mogleg å opprette ein brukar, og skrive denne til databasen.

Her må du hugse å:
- Skrive nødvendig SQL for å opprette ein brukar
- Lage ei rute som skriv til databasen
- Lage ei nettside med eit skjema som nyttar ruta over.
- Handter ulike moglege feil som kan dukke opp. 

…

## Oppgåve 5 – Kryptering av passord
Benytt bcrypt for å kryptere passordet som blir benytta i oppgåve 4. 

## Oppgåve 6 – Nytt miniprosjekt: Nettavis
Besøk ein artikkel på NRK.no og lag ein datamodell for korleis du meiner denne ser ut.

Steg 1: Gå gjennom artikkelen og tenk gjennom kva tabellar som er nødvendige, og kva relasjonar som gjeld mellom desse.

Steg 2: Teikn ein modell for tankane du sit igjen med frå steg 1 på papir. Legg opp til litt «problematisering», som viser at du forstår problem du kan havne i, og feil du bør unngå = diskuter/snakk høgt. Du må sjølv vise at mange-til-mange-relasjonar ikkje er lov, og kva du gjer for å løyse dette.

Steg 3: Lag ein digital versjon av modellen i MySQL Workbench.

Steg 4: Lag ein database basert på modellen, fyll inn eksempeldata og køyr nokre spørringar for å sjå om «ting» fungerer.

Lever inn: 
- Bilete av teikna modell (frå papir)
- PNG/JPG av modell frå Workbench
- Skjermbilete av spørringar (2 stk.) som viser alle artiklane som tilfredsstiller fylgjande krav:
    - "Jo Bjørnar Hausnes" er ein av journalistane
    - "Jo Bjørnar Hausnes" og "Trond Sneåas Skauge" sine beste saker saman (mest populære basert på antall visningar)