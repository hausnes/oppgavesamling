# Særs enkel chat (Node + Express + better-sqlite3)

Dette er eit minimalt døme på ein chat-server utan innlogging. Alle meldingar blir lagra i ei lokal SQLite-fil `chat.db` og vist i ein enkel HTML-klient.

## Køyre lokalt

1. Gå til mappa `eksempel/nodejs/chat-enkel`
2. Installer avhengigheiter
3. Start serveren
4. Opne nettlesar på http://localhost:3000

### PowerShell (Windows)

```powershell
cd sti-til-<din-mappe>\chat-enkel
npm install
npm start
```

## Endepunkt

- `GET /api/messages` – returnerer alle meldingar som JSON
- `POST /api/messages` – legg til ei melding. JSON-body: `{ "name": "…", "message": "…" }`

## Struktur

- `app.js` – Express-server, ruter og database
- `public/index.html` – enkel klient som hentar/viser og sender meldingar
- `chat.db` – SQLite-database blir oppretta automatisk ved første start

## Vidare arbeid (idear)

- Auto-oppdatering med SSE/WebSocket, eventuelt forenkla vha. setInterval
- Enklare moderering (maks lengde, banning filter, osv.)
- Enkel paginering og avgrensing av resultata
- Eige stilark og litt finare utsjånad
- Innlogging og brukarhandtering
- Sende meldingar til andre brukarar
- Bruke ein meir avansert database (PostgreSQL, MySQL, MongoDB, m.m.)