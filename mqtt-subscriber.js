const mqtt = require('mqtt')
const client = mqtt.connect('wss://areve-beetle.herokuapp.com/mqtt')
client.on('connect', () => {
  client.subscribe('log')
})
client.on('message', (topic, message) => {
  const findTrailingLF = /\n$/
  context = message.toString();
  console.log(topic, context.replace(findTrailingLF, ''))
})