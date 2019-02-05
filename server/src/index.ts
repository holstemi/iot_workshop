import express from 'express';
import bodyParser from 'body-parser';
import { networkInterfaces } from 'os';

import {insertReading} from './dbUtils';

const app = express();
app.use(bodyParser.json());

app.post('/api/new_reading', (req:Request, res:Response) => {
    const reading: NewReading = req.body;
    console.log("recieed new data", req.body);
    try{
        assertReading(reading);
    }
    catch(error){
        return res.status(400).send(error);
    }

    insertReading(reading){

    }
    res.send(req.body);
});

const assertReading = (NewReading | null =>{
    if(!reading){
        throw 'Invalid request body'; 
    }
    const {name, temperature, pressure, humidity} = reading;
    if (!name||typeof name !== 'string'||name.length < 3){
        throw 'Invalid or missing parameter "name"';
    }
    else if(!temperature ||typeof temperature !== 'number'){
        throw 'Invalid or missing parameter "temp"'
    }
    else if(!pressure ||typeof pressure !== 'number'){
        throw 'Invalid or missing parameter "pres"'
    }
    else if(!humidity ||typeof humidity !== 'number'){
        throw 'Invalid or missing parameter "humid"'
    }

});

const port = process.env.PORT ||3001;
app.listen(port, () =>{
    console.log("Server listening on port 3001")
});