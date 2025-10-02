// Server-bit, setter opp en Express-app
const express = require('express');
const app = express();

// Databasen
const Database = require('better-sqlite3');
const db = new Database('chat.db');

// Serve statiske filer fra public-mappen
app.use(express.static('public'));

// Eksempel på en rute
app.get('/', (req, res) => {
    // res.send("Hei!");
    res.sendFile(__dirname + '/public/index.html');
});

// Eksempel på en rute
app.get('/hentMeldinger', (req, res) => {
    const row = db.prepare('SELECT * FROM melding').all();
    res.json(row);
});

// Åpner en viss port på serveren, og nå kjører den
app.listen(3000, () => {
    console.log('Server kjører på port 3000');
});