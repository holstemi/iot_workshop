# Fake sensor
Käytetään randomoidun mock -datan antamiseen palvelimelle

## Esivaatimukset
1. Varmista, että NodeJS 10 asennettu (tarkista: `node --version` tai `npm --version`)
2. Asenna ja alusta yarn (fake_sensor kansiossa: `npm install --global yarn && yarn init -y`)
3. Varmista että node_modules kansio ei päädy GitHubiin (turhaa binääridataa) (`echo "node_modules/" > .gitignore`)
4. Asenna axios (`yarn add axios`)

## Käyttö
1. Aja ohjelma (`node sensor.js`)
