// Server-bit, setter opp en Express-app
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();

// Databasen
const Database = require('better-sqlite3');
const db = new Database('chat.db');

// Opprett tabeller om de ikke finnes fra før
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    url TEXT,
    price_cents INTEGER NOT NULL,
    category TEXT,
    billing_cycle TEXT DEFAULT 'monthly',
    currency TEXT DEFAULT 'NOK',
    start_date TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

// Serve statiske filer fra public-mappen
app.use(express.static(path.join(__dirname, 'public')));

// Legg til body-parsing for skjema/JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sesjon (enkelt oppsett for demo). For produksjon: bruk sikker secret og en persistent store.
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dager
        }
    })
);

// Hjelpe-middleware for å sjekke innlogging
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Ikke innlogget' });
    }
    next();
}

// Auth-endepunkter
app.post('/api/register', (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'E-post og passord er påkrevd' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existing) {
        return res.status(409).json({ error: 'Bruker finnes allerede' });
    }

    const password_hash = bcrypt.hashSync(password, 10);
    const info = db
        .prepare('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)')
        .run(email.toLowerCase(), name || null, password_hash);

    const user = { id: info.lastInsertRowid, email: email.toLowerCase(), name: name || '' };
    req.session.user = user;
    res.json({ user });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'E-post og passord er påkrevd' });
    }
    const row = db.prepare('SELECT id, email, name, password_hash FROM users WHERE email = ?').get(email.toLowerCase());
    if (!row) return res.status(401).json({ error: 'Feil e-post eller passord' });
    const ok = bcrypt.compareSync(password, row.password_hash);
    if (!ok) return res.status(401).json({ error: 'Feil e-post eller passord' });
    const user = { id: row.id, email: row.email, name: row.name || '' };
    req.session.user = user;
    res.json({ user });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ ok: true });
    });
});

app.get('/api/me', (req, res) => {
    res.json({ user: req.session.user || null });
});

// CRUD for abonnement
app.get('/api/subscriptions', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const rows = db
        .prepare(
            `SELECT id, name, description, url, price_cents, category, billing_cycle, currency, start_date, is_active, created_at
             FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC`
        )
        .all(userId);
    res.json({ items: rows });
});

app.post('/api/subscriptions', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    let { name, description, url, price, category, billing_cycle, currency, start_date, is_active } = req.body;
    if (!name || price == null) return res.status(400).json({ error: 'Navn og pris er påkrevd' });
    const price_cents = Math.round(Number(price) * 100);
    if (Number.isNaN(price_cents) || price_cents < 0) return res.status(400).json({ error: 'Ugyldig pris' });
    const info = db
        .prepare(
            `INSERT INTO subscriptions (user_id, name, description, url, price_cents, category, billing_cycle, currency, start_date, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
            userId,
            name,
            description || null,
            url || null,
            price_cents,
            category || null,
            billing_cycle || 'monthly',
            currency || 'NOK',
            start_date || null,
            is_active === undefined ? 1 : Number(!!is_active)
        );
    const created = db
        .prepare(
            `SELECT id, name, description, url, price_cents, category, billing_cycle, currency, start_date, is_active, created_at FROM subscriptions WHERE id = ?`
        )
        .get(info.lastInsertRowid);
    res.status(201).json({ item: created });
});

app.put('/api/subscriptions/:id', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const { id } = req.params;
    const current = db.prepare('SELECT * FROM subscriptions WHERE id = ? AND user_id = ?').get(id, userId);
    if (!current) return res.status(404).json({ error: 'Ikke funnet' });

    const {
        name = current.name,
        description = current.description,
        url = current.url,
        price = current.price_cents / 100,
        category = current.category,
        billing_cycle = current.billing_cycle,
        currency = current.currency,
        start_date = current.start_date,
        is_active = current.is_active
    } = req.body || {};

    const price_cents = Math.round(Number(price) * 100);
    if (Number.isNaN(price_cents) || price_cents < 0) return res.status(400).json({ error: 'Ugyldig pris' });

    db.prepare(
        `UPDATE subscriptions SET name=?, description=?, url=?, price_cents=?, category=?, billing_cycle=?, currency=?, start_date=?, is_active=?
         WHERE id=? AND user_id=?`
    ).run(
        name,
        description,
        url,
        price_cents,
        category,
        billing_cycle,
        currency,
        start_date,
        Number(!!is_active),
        id,
        userId
    );
    const updated = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(id);
    res.json({ item: updated });
});

app.delete('/api/subscriptions/:id', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const { id } = req.params;
    const info = db.prepare('DELETE FROM subscriptions WHERE id = ? AND user_id = ?').run(id, userId);
    if (info.changes === 0) return res.status(404).json({ error: 'Ikke funnet' });
    res.json({ ok: true });
});

// Statistikk-endepunkter
app.get('/api/stats/summary', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const totalRow = db.prepare('SELECT SUM(price_cents) as total_cents FROM subscriptions WHERE user_id = ? AND is_active = 1').get(userId);
    const byCategory = db
        .prepare('SELECT COALESCE(category, "Uten kategori") as category, SUM(price_cents) as total_cents FROM subscriptions WHERE user_id = ? AND is_active = 1 GROUP BY COALESCE(category, "Uten kategori") ORDER BY total_cents DESC')
        .all(userId);
    const activeCount = db.prepare('SELECT COUNT(*) as count FROM subscriptions WHERE user_id = ? AND is_active = 1').get(userId);
    res.json({
        currency: 'NOK',
        monthlyTotal: ((totalRow.total_cents || 0) / 100),
        byCategory: byCategory.map(r => ({ category: r.category, monthly: r.total_cents / 100 })),
        activeCount: activeCount.count || 0
    });
});

// Standard rute for å hente index.html AKA startsiden
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Åpner en viss port på serveren, og starter serveren
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});