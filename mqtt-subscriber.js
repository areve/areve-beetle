const mqtt = require('mqtt')
const client = mqtt.connect('ws://localhost/mqtt')
client.on('connect', () => {
  client.subscribe('log')
})
client.on('message', (topic, message) => {
  context = message.toString();
  console.log(topic, context)
})