# Oppgavesamling for databaser, SQL og datamodellering
Mange av oppgåvene her let deg øve deg på å skrive spørringar opp mot ein allerede eksisterande database. 

Du kan skrive spørringane på fleire måtar:
- Installer [SQLite Studio](https://sqlitestudio.pl/), og opne eit (eller fleire) SQL-vindu.
- Skriv spørringar direkte i Visual Studio Code.
- ...

## SQL - spørringar
Last ned databasefila «world» (lenke: https://dev.mysql.com/doc/index-other.html). Direktelenke: [world.zip](https://downloads.mysql.com/docs/world-db.zip).

Bli kjent med strukturen for databasen.

1.	List opp alle land 
2.	Finn hovedstaden til et spesifikt land
3.	List byer med befolkning over 5 millioner
4.	Vis land med over 100 millioner befolkning
5.	Finn landet med høyest forventet levealder
6.	List de 5 mest befolkede landene i verden
7.	Vis befolkningen til hver verdensdel. PS. Se på GROUP BY og SUM
8.	Finn land som snakker engelsk
9.	Sorter land etter befolkning i synkende rekkefølge
10.	Tell antall land i hver verdensdel PS. Se på GROUP BY og COUNT
11.	Vis byen i hvert land som har flest innbyggere i landet (Se på MAX og GROUP BY)
12.	Finn alle offisielle språk i Europa
13.	Informasjonen i databasen er utdatert. Velg  de 5 største landene og 5 største byene og oppdater informasjon
14.	…

## Musikkdatabase (Hilde A.)
Design en relasjonsdatabase for musikkartister. Lag datamodellen.

Databasen skal minst inneholde følgende tabeller 
- Artist 
- Medlem (For band/grupper) 
- Album 
- Låt 
- Sjanger 

Sammmenligne din egen datamodell med vedlagte [musikk.db](/databaser/musikk-hilde/musikk.db)-database.

Oppgaver til vedlagte [musikk.db](/databaser/musikk-hilde/musikk.db)-database:
Ved hjelp av INSERT SQL:  
- Legg til artisten Pink Floyd,  
- Legg til medlemmene til Pink Floyd,  
- Legg til minst 2 album fra Pink Floyd,  
- Legg til minst to låter fra hvert album.   
- For å legge til dette bandet, må du også legge til en ny sjanger i databasen. 

Andre spørringer:
- Skriv en SELECT SQL som henter ut alle band som begynner med P
- Skriv SQL som henter ut alle band og alle medlemmer 
- Skriv SQL som setter inn et dummy band 
- Skriv delete SQL som sletter dette dummybandet 
- Skriv SQL som henter ut alle låtene til Pink Floyd og hvilket album de er på 
- Skriv SQL som henter ut de 2 bandene som har flest låter 
- Opprett en tabell som inneholder konserter  
- Sett inn data i konsert tabellen (F.eks Pink Floyd hadde konsert I Roma 20/06/1971 )   
- Legg til en teoretisk konsert frem i tid 