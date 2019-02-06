-- Up
CREATE TABLE Sensor (
  name TEXT PRIMARY KEY,
  firstonline TEXT NOT NULL,
  lastonline TEXT NOT NULL
);
CREATE TABLE Reading (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sensorname TEXT,
  temperature NUMERIC(10,2),
  pressure NUMERIC(10,2),
  humidity NUMERIC(10,2),
  timestamp TEXT,
  FOREIGN KEY (sensorname) REFERENCES Sensor(name)
);

-- Down
DROP TABLE Sensor;
DROP TABLE Reading;