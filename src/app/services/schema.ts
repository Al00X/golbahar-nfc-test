export const createSchema: string = `
CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    size REAL,
);`;
