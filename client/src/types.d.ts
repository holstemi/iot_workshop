interface Sensor {
    name: string,
    firstonline: string,
    lastonline: string
}
  
interface Reading {
    sensorname: string,
    temperature: number,
    pressure: number,
    humidity: number,
    timestamp: string
}