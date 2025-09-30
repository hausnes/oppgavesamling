// SÆRS enkel chat-server med Express og better-sqlite3
// Kjøring: npm install, så npm start. Åpne http://localhost:3000

const path = require('path');
const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

// Opprett/åpne databasefil i samme mappe som app.js
const dbPath = path.join(__dirname, 'chat.db');
const db = new Database(dbPath);

// Lag tabell om den ikkje finst frå før
db.prepare(`
	CREATE TABLE IF NOT EXISTS messages (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		message TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
`).run();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // for HTML-skjema
app.use(express.json()); // for fetch/JSON

// Enkelt helsesjekk-endepunkt (valfritt)
app.get('/api/health', (req, res) => {
	res.json({ ok: true });
});

// Hent alle meldingar (simplaste mogleg)
app.get('/api/messages', (req, res) => {
	try {
		const rows = db
			.prepare('SELECT id, name, message, created_at FROM messages ORDER BY id ASC')
			.all();
		res.json(rows);
	} catch (err) {
		console.error('Feil ved henting av meldingar:', err);
		res.status(500).json({ error: 'Kunne ikkje hente meldingar' });
	}
});

// Legg til ny melding
app.post('/api/messages', (req, res) => {
	try {
		let { name, message } = req.body || {};

		// Veldig enkel validering (kan byggast ut seinare)
		name = (name || '').toString().trim();
		message = (message || '').toString().trim();
		if (!name || !message) {
			return res.status(400).json({ error: 'Namn og melding er påkravd' });
		}

		// Enkle lengdeavgrensingar for å unngå tull
		if (name.length > 50) name = name.slice(0, 50);
		if (message.length > 1000) message = message.slice(0, 1000);

		const info = db
			.prepare('INSERT INTO messages (name, message) VALUES (?, ?)')
			.run(name, message);

		// Returner enkel JSON-respons
		res.status(201).json({ id: info.lastInsertRowid, name, message });
	} catch (err) {
		console.error('Feil ved innsending av melding:', err);
		res.status(500).json({ error: 'Kunne ikkje lagre melding' });
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`Chat-appen køyrer på http://localhost:${PORT}`);
});

