const mqtt = require('mqtt')
const client = mqtt.connect('wss://areve-beetle.herokuapp.com')
client.on('connect', () => {
  setInterval(() => {
    const message = new Date().toISOString()
    client.publish('log', message)
    console.log('sent', message)
    }, 1000)
})