import Database from 'better-sqlite3';
import path from 'path';

// Define DB path
const dbPath = path.join(process.cwd(), 'sbti.db');

// Initialize database
const db = new Database(dbPath);

// Create tables if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY,
    total_participants INTEGER
  );

  CREATE TABLE IF NOT EXISTS results_stats (
    type TEXT PRIMARY KEY,
    count INTEGER
  );

  CREATE TABLE IF NOT EXISTS traits_stats (
    trait TEXT PRIMARY KEY,
    count INTEGER
  );
`);

// Initialize default total_participants if empty
const initStats = db.prepare('SELECT * FROM stats WHERE id = 1').get();
if (!initStats) {
  db.prepare('INSERT INTO stats (id, total_participants) VALUES (1, 201312)').run();
}

export default db;
