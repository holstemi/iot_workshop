import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { insertReading, getSensors, getReadings } from './dbUtils';

const app = express();
app.use(bodyParser.json());

/**
 * POST /api/newreading
 * Send a new reading from the sensor to the server
 */
app.post('/api/newreading', (req: Request, res: Response) => {
  const reading: NewReading = req.body;
  console.log('received new reading:', reading);

  try {
    assertReading(reading);
  }
  catch (error) {
    return res.status(400).send(error); // HTTP 400 Bad Request
  }

  insertReading(reading)
    .then(() => res.send(reading))
    .catch(err => res.status(500).send(err)); // HTTP 500 Internal Server Error

  res.send(reading);
});

const assertReading = (reading: NewReading | null) => {
  if (!reading) {
    throw 'Invalid request body';
  }

  const { name, temperature, pressure, humidity } = reading;

  if (!name || typeof name !== 'string' || name.length < 3) {
    throw 'Invalid or missing parameter "name"';
  }
  else if (!temperature || typeof temperature !== 'number') {
    throw 'Invalid or missing parameter "temperature"';
  }
  else if (!pressure || typeof pressure !== 'number') {
    throw 'Invalid or missing parameter "pressure"';
  }
  else if (!humidity || typeof humidity !== 'number') {
    throw 'Invalid or missing parameter "humidity"';
  }
};

/**
 * GET /api/getsensors
 * List sensor data
 */
app.get('/api/getsensors', (req: Request, res: Response) => {
  console.log('Received getsensors request');
  getSensors()
    .then(sensors => res.send(sensors))
    .catch(err => res.status(500).send(err)); // HTTP 500 Internal Server Error
});

/**
 * GET /api/getreadings
 * List reading data
 */
app.get('/api/getreadings/:limit', (req: Request, res: Response) => {
  console.log('Received getreadings request');
  getReadings(req.params.limit)
    .then(readings => res.send(readings))
    .catch(err => res.status(500).send(err));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});