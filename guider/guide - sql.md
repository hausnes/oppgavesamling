# SQL - en kort introduksjon

SQL (`S`tructured `Q`uery `L`anguage) er språket vi bruker for å jobbe med databaser, noe som inkluderer å opprette og manipulere struktur og innhold, samt å be databasen om å vise den informasjonen du er ute etter. Denne guiden viser noen av de viktigste kommandoene med konkrete eksempler.

## 1. CREATE TABLE - Lag en ny tabell

```sql
CREATE TABLE elever (
    id INTEGER PRIMARY KEY,
    navn TEXT NOT NULL,
    alder INTEGER,
    klasse TEXT
);
```

## 2. INSERT INTO - Legg til data

```sql
-- Legg til en elev
INSERT INTO elever (navn, alder, klasse) 
VALUES ('Ola Nordmann', 17, 'VG2');

-- Legg til flere elever samtidig
INSERT INTO elever (navn, alder, klasse) VALUES 
('Kari Hansen', 18, 'VG3'),
('Ali Reza', 16, 'VG1'),
('Emma Larsen', 17, 'VG2');
```

## 3. ALTER TABLE - Endre tabellstruktur

```sql
-- Legg til ny kolonne
ALTER TABLE elever ADD COLUMN email TEXT;

-- Fjern kolonne (ikke støttet i alle databaser)
ALTER TABLE elever DROP COLUMN email;
```

## 4. DELETE - Slett data

```sql
-- Slett en spesifikk elev
DELETE FROM elever WHERE id = 1;

-- Slett alle elever i VG1
DELETE FROM elever WHERE klasse = 'VG1';

-- Slett ALL data (vær forsiktig!)
DELETE FROM elever;
```

---

## SELECT - Spørringer (fra enkel til avansert)

### Grunnleggende SELECT

```sql
-- Hent alle elever
SELECT * FROM elever;

-- Hent bare navn og alder
SELECT navn, alder FROM elever;
```

### WHERE - Filtrering

```sql
-- Elever over 17 år
SELECT * FROM elever WHERE alder > 17;

-- Elever i VG2
SELECT * FROM elever WHERE klasse = 'VG2';

-- Kombinere betingelser
SELECT * FROM elever WHERE alder >= 17 AND klasse = 'VG2';
```

### ORDER BY - Sortering

```sql
-- Sorter etter alder (stigende)
SELECT * FROM elever ORDER BY alder;

-- Sorter etter navn (synkende)
SELECT * FROM elever ORDER BY navn DESC;

-- Sorter etter klasse, så alder
SELECT * FROM elever ORDER BY klasse, alder;
```

### LIKE - Tekstsøk

```sql
-- Alle navn som starter med 'O'
SELECT * FROM elever WHERE navn LIKE 'O%';

-- Alle navn som inneholder 'sen'
SELECT * FROM elever WHERE navn LIKE '%sen%';
```

### COUNT, SUM, AVG - Aggregering

```sql
-- Antall elever
SELECT COUNT(*) FROM elever;

-- Gjennomsnittlig alder
SELECT AVG(alder) FROM elever;

-- Antall elever per klasse
SELECT klasse, COUNT(*) FROM elever GROUP BY klasse;
```

### JOIN - Koble tabeller

Lag først en ny tabell:
```sql
CREATE TABLE fag (
    id INTEGER PRIMARY KEY,
    elev_id INTEGER,
    fag_navn TEXT,
    karakter INTEGER
);

INSERT INTO fag (elev_id, fag_navn, karakter) VALUES 
(1, 'Matematikk', 5),
(1, 'Norsk', 4),
(2, 'Matematikk', 6);
```

Koble tabellene:
```sql
-- INNER JOIN - bare elever som har karakterer
SELECT elever.navn, fag.fag_navn, fag.karakter 
FROM elever 
INNER JOIN fag ON elever.id = fag.elev_id;

-- LEFT JOIN - alle elever, også de uten karakterer
SELECT elever.navn, fag.fag_navn, fag.karakter 
FROM elever 
LEFT JOIN fag ON elever.id = fag.elev_id;
```

### Avanserte spørringer

```sql
-- Elever med karaktersnitt over 4
SELECT elever.navn, AVG(fag.karakter) as snitt
FROM elever 
INNER JOIN fag ON elever.id = fag.elev_id
GROUP BY elever.id, elever.navn
HAVING AVG(fag.karakter) > 4;

-- Subquery - finn eldste elev
SELECT * FROM elever 
WHERE alder = (SELECT MAX(alder) FROM elever);
```

---

## Nyttige tips

- Bruk alltid **semikolon (;)** for å avslutte SQL-setninger
- **STORE BOKSTAVER** for SQL-nøkkelord er tradisjonelt, men ikke påkrevd
- Bruk **--** for kommentarer på én linje
- Test alltid **SELECT** før du kjører **DELETE** eller **UPDATE**
- Husk **WHERE** i DELETE/UPDATE for å unngå å påvirke hele tabellen

## Øvingsoppgaver

1. Lag en tabell for bøker med tittel, forfatter og år
2. Legg inn 5 bøker
3. Finn alle bøker utgitt etter 2000
4. Sorter bøkene alfabetisk etter forfatter
5. Tell hvor mange bøker hver forfatter har skrevet