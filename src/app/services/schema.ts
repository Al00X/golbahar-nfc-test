export const SCHEMA_CREATE_DATA_TABLE: string = `
CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY NOT NULL,
    firstname TEXT UNIQUE NOT NULL,
    lastname TEXT,
    age INTEGER
)`;

export interface IData {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

export const QUERY_ALL_FROM_DATA  = `
SELECT * from data
`

export const INSERT_TO_DATA = `
INSERT INTO data (firstname, lastname, age) VALUES (?,?,?)
`

export const DELETE_FROM_DATA = `
DELETE FROM data WHERE id=?
`
