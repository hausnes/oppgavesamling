# Begreper rundt databaser

Om [konfidensialitet, integritet og tilgjengelighet](https://ndla.no/r/teknologiforstaelse-im-ikm-vg1/konfidensialitet-integritet-og-tilgjengelighet/bfa554f38c) hos NDLA.

Uttrykket "I swear to use the key, the whole key, and nothing but the key" er en referanse til normalisering i relasjonsdatabaser. Det er en lek med ordene fra den engelske edsavleggelsen og brukes for å forklare de tre første normalformene (1NF, 2NF og 3NF) i database-design.
- 1NF (First Normal Form): Dataen må være atomisk, det vil si at hver celle i en tabell inneholder kun én verdi, og det kan ikke være dupliserte rader.
- 2NF (Second Normal Form): Alle ikke-nøkkelattributter må være fullstendig avhengige av hele primærnøkkelen.
- 3NF (Third Normal Form): Alle ikke-nøkkelattributter må være direkte avhengige av primærnøkkelen og ikke av noen andre ikke-nøkkelattributter.

Uttrykket "The key, the whole key, and nothing but the key, so help me Codd" er en hyllest til Edgar F. Codd, som utviklet konseptet med relasjonsdatabaser.

| Begrep | Forklaring |
|--------|------------|
| **Database** | Strukturert samling av data med hensikt å lagre og prosessere data mest mulig effektivt. |
| **DBMS (database management system)** | Programvare for å samle inn, prosessere og lagre data |
| **Entitet** | Det du lagrer informasjon om – tabell |
| **Attributt** | Egenskaper til en entitet |
| **Verdi** | Dataene som registreres til attributtet |
| **Datatype** | Definerer oppsett på hva som fylles inn. Type data. Int = heltall, varchar = tekst |
| **Relasjoner** | Forholdet mellom entiteter |
| **Kråkefotnotasjon** | Symboler som oftest brukes til å beskrive relasjoner mellom entiteter i en ER-modell |
| **ER-modellering** | Grafisk oversikt over entiteter med attributter og datatyper, og beskrivende relasjoner mellom entitetene |
| **Determinering, avhengighet** | At et felt bestemmer et annet |
| **KIT** | [Konfidensialitet, Integritet og tilgjengelighet](https://ndla.no/r/teknologiforstaelse-im-ikm-vg1/konfidensialitet-integritet-og-tilgjengelighet/bfa554f38c) |

---

## Relasjonstyper

| Symbol | Forklaring |
|--------|------------|
| **M:M** | Mange til mange relasjon – NB: Er ikke lov = 3+ tabeller |
| **1:M** | En til mange relasjon = to tabeller |
| **1:1** | En til en relasjon = en tabell |

---

## Normalformer

| Normalform | Forklaring |
|------------|------------|
| **Normalformer** | Regelsett for å strukturere databasen mest mulig effektivt |
| **1ste NF** | Del alt opp så mye som mulig = atomærkravet. Må opprette en primærnøkkel |
| **2dre NF** | Attributtene i en tabell må være avhengig av hele primærnøkkelen og ikke bare deler av den |
| **3dje NF** | Alle attributter i en tabell blir bestemt ut ifra PN - OG bare den – ingen andre (annet enn sekundærnøkler) |

---

## Nøkkelbegreper

| Begrep | Forklaring |
|--------|------------|
| **Kandidatnøkkel** | Et attributt som er unikt (som identifiserer en spesifikk forekomst i en entitet) |
| **Primærnøkkel** | Det attributtet (kandidatnøkkel) som velges som identifikatoren i en tabell |
| **Sekundærnøkkel** | Den kandidatnøkkelen som ikke brukes som primærnøkkel |
| **Fremmednøkkel** | PN i en tabell som brukes til å lenke sammen mot en annen tabell |