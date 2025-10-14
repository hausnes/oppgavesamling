// Server-bit, setter opp en Express-app
const express = require('express');
const app = express();

// Databasen
const Database = require('better-sqlite3');
const db = new Database('chat.db');

// Opprett database om den ikke finnes fra før
db.prepare(`
    CREATE TABLE IF NOT EXISTS melding (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person TEXT NOT NULL,
        melding TEXT NOT NULL,
        tid TEXT NOT NULL
    )
`).run();

// Serve statiske filer fra public-mappen
app.use(express.static('public'));

// Legg til body-parsing for skjema/JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Standard rute for å hente index.html AKA startsiden
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Eksempel på en rute
app.get('/hentMeldinger', (req, res) => {
    const rows = db.prepare('SELECT id, person, melding, tid FROM melding ORDER BY id ASC').all();
    res.json(rows);
});

// Rute som legger til en melding (klienten sender tid i format YYYY-MM-DD HH:MM:SS)
app.post('/leggMelding', (req, res) => {    
    try {
        let { person, melding, tid } = req.body;
        person = person.toString().trim();
        melding = melding.toString().trim();
        tid = tid.toString().trim();

        console.log('Mottatt melding:', { person, melding, tid });

        // Enkle lengdebegrensninger
        // if (person.length > 50) person = person.slice(0, 50);
        // if (melding.length > 1000) melding = melding.slice(0, 1000);

        db.prepare('INSERT INTO melding (person, melding, tid) VALUES (?, ?, ?)')
        .run(person, melding, tid);

        return res.sendStatus(201); // viktig: avslutt responsen her
    }
    catch (err) {
        console.error('Feil ved innsending av melding:', err);
        return res.status(500).json({ error: 'Kunne ikke lagre melding' });
    }
});

// Åpner en viss port på serveren, og starter serveren
app.listen(3000, () => {
    console.log('Server kjører på http://localhost:3000');
});