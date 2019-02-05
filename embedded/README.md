# Embedded (Arduino- / sulariosuus)
`embedded.ino` sisältää "Arduinolla" (ESP8266/BMP280) suoritettavan koodin, joka lähettää POSTilla sensoridataa kovakoodattun palvelinosoitteeseen. Tulostelee myös Serialiin sensoridataa ja statusilmoituksia (IP osoite, HTTP -error codet)

## Perustoimintaperiaate
```c++
//Suoritetaan vain käynnistäessä
void setup() {
  //Asetetaan mikrokontrollerin käskynopeus
  //Aktivoidaan I2C väylä käyttön
  //Tarkistetaan onko BMP280 -senori läsnä
  //Alustetaan wifi-siru ja annetaan APn tiedot
}

//Suoritetaan jatkuvasti
void loop() {
  printSensors();
  dataToPOST(makeJSON());
  //Wait 5 seconds
}
```