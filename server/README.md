# Server
Hoitaa backendiä

## Esivaatimukset
1. Alustus (` yarn init -y && yarn add --dev typecript && npx tsc --init`)
2. Muokkaa tsconfig.json: 
    a. `//"lib":[],` --> `"lib":["esnext", "dom"]`
    b. `//"outDir": "./", --> "outDir": "./.build",`
3. Lisää package.json
´´´
"scripts":{
    "build":"tsc -p tsconfig.json",
    "start":"yarn build && node .build"
  }
´´´
4. Tee src kansio ja lisää index.ts tiedostoon testikoodia

## Käyttö
1. Aja ohjelma (`yarn start`)
