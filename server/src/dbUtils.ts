import sqlite from 'sqlite';
import SQL from 'sql-templat-strings';

const dbPromise = Promise.resolve()
    .then (() => sqlite.open('database.db'))
    .then(db => db.migrate({force:'last'}));

const instertReading = ((reading:NewReading) => {
    const {name, temperature, pressure, humidity} = reading;
    const timestamp = new Date().toISOString();

    const insertSensorQuery = SQL`
    INSERT OR IGNORE INTO sensor (name, firstonline, lastonline)
    VALUES (${name}, ${timestamp}, ${timestamp}
    `;

    const updateSensorQuery = SQL`
    UPDATE sensor
    SET lastonline = ${timestamp} WHERE name = ${name}
    `;

    const inertReadingQuery = SQL

    return dbPromise
        .then(db => Promise.all)

});