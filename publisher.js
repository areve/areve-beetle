const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')
client.on('connect', () => {
  setInterval(() => {
    const message = new Date().toISOString()
    client.publish('log', message)
    console.log('sent', message)
    }, 1000)
})