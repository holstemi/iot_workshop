"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.post('/api/new_reading', function (req, res) {
    var reading = req.body;
    console.log("recieed new data", req.body);
    try {
        assertReading(reading);
    }
    catch (error) {
        return res.status(400).send(error);
    }
    res.send(req.body);
});
var assertReading = (NewReading | null);
{
    if (!reading) {
        throw 'Invalid request body';
    }
    var name_1 = reading.name, temperature = reading.temperature, pressure = reading.pressure, humidity = reading.humidity;
    if (!name_1 || typeof name_1 !== 'string' || name_1.length < 3) {
        throw 'Invalid or missing parameter';
    }
    else if (!temperature || typeof temperature !== 'number') {
        throw 'Invalid or missing parameter "temp"';
    }
    else if (!pressure || typeof pressure !== 'number') {
        throw 'Invalid or missing parameter "pres"';
    }
    else if (!humidity || typeof humidity !== 'number') {
        throw 'Invalid or missing parameter "humid"';
    }
}
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("Server listening on port 3001");
});
