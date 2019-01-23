const axios = require('axios');

const round = num => Math.round(num * 100) / 100;

axios.post('http://localhost:3001/api/newreading', {
  name: 'Timo Teekkari',
  temperature: round(17 + (5 * Math.random())),
  pressure: round(8500 + (2500 * Math.random())),
  humidity: round(14 + (76 * Math.random()))
})
  .then(() => console.log('success'))
  .catch(err => {
    if (!err.response) {
      return console.log('Cannot connect to server')
    }
    console.log('Error:', err.response.data)
  });