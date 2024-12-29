// filepath: /c:/Users/enesh/Projects/iip-final-tetris-react/server.cjs
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Veritabanı bağlantısı
const db = new sqlite3.Database('./database.db'); // Veritabanını dosyada saklama

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY, name TEXT, score INTEGER)");
});

app.use(cors());
app.use(express.json());

app.get('/scores', (req, res) => {
  db.all("SELECT * FROM scores ORDER BY score DESC LIMIT 10", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get('/tenthscore', (req, res) => {
  db.all("SELECT * FROM scores ORDER BY score DESC LIMIT 1 OFFSET 9", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});   

app.post('/scores', (req, res) => {
  const { name, score } = req.body;
  db.run(`INSERT INTO scores (name, score) VALUES (?, ?)`, [name, score], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ id: this.lastID });
  });
  db.run("DELETE FROM scores WHERE id IN (SELECT id FROM scores ORDER BY score ASC LIMIT 1)");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});