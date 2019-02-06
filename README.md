# IoT-workshop

#### Tarkoituksena tehdä Arduino-pohjainen IoT -sensori, joka mittaa lämpötilaa, kosteutta ja ilmanpainetta ja lähettää datan JSON muodossa React+Express+SQLite palvelimelle

### Embedded -kansio
Sisältää "Arduinolla" (ESP8266/BMP280) suoritettavan koodin, joka lähettää POSTilla sensoridataa kovakoodattun palvelinosoitteeseen

### Fake_sensor -kansio
Sisältää palvelimelle annettavan mock -datan luontiscriptin (kopioitu suoraan digit_koodit reposta)

### Server -kansio
Sisältää backendin, joka on tehty Express & SQLite tekniikoilla

###Client -kansio
Sisältää frontin, joka on tehty Reactilla (create-react-app)

´´´
Luontijärjestys:
1. Embedded
2. Fake_sensor
3. Backend
4. Front
´´´