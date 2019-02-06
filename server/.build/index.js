"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dbUtils_1 = require("./dbUtils");
var app = express_1.default();
app.use(body_parser_1.default.json());
/**
 * POST /api/newreading
 * Send a new reading from the sensor to the server
 */
app.post('/api/newreading', function (req, res) {
    var reading = req.body;
    console.log('received new reading:', reading);
    try {
        assertReading(reading);
    }
    catch (error) {
        return res.status(400).send(error); // HTTP 400 Bad Request
    }
    dbUtils_1.insertReading(reading)
        .then(function () { return res.send(reading); })
        .catch(function (err) { return res.status(500).send(err); }); // HTTP 500 Internal Server Error
    res.send(reading);
});
var assertReading = function (reading) {
    if (!reading) {
        throw 'Invalid request body';
    }
    var name = reading.name, temperature = reading.temperature, pressure = reading.pressure, humidity = reading.humidity;
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
app.get('/api/getsensors', function (req, res) {
    console.log('Received getsensors request');
    dbUtils_1.getSensors()
        .then(function (sensors) { return res.send(sensors); })
        .catch(function (err) { return res.status(500).send(err); }); // HTTP 500 Internal Server Error
});
/**
 * GET /api/getreadings
 * List reading data
 */
app.get('/api/getreadings/:limit', function (req, res) {
    console.log('Received getreadings request');
    dbUtils_1.getReadings(req.params.limit)
        .then(function (readings) { return res.send(readings); })
        .catch(function (err) { return res.status(500).send(err); });
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
