const mqtt = require('mqtt')
const client = mqtt.connect('wss://areve-beetle.herokuapp.com/mqtt')
client.on('connect', () => {
  setInterval(() => {
    const message = new Date().toISOString()
    client.publish('line1', 'hello ' + message)
    client.publish('line2', 'world ' + message)
    const trueOrFalse = ~~(Math.random() * 2)
    client.publish('backlight', trueOrFalse ? 'on': 'off')
    client.publish('log', 'log from mqtt-publisher ' + message)
    }, 2000)
})