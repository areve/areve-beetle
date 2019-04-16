const mqtt = require('mqtt')
const client = mqtt.connect('wss://areve-beetle.herokuapp.com/mqtt')
let connected = false
client.on('connect', () => {
  if (!connected) {
    setInterval(() => {
      const message = new Date().toISOString()
      client.publish('log', 'log from mqtt-publisher ' + message)
      }, 10000)

    setInterval(() => {
      const number1 = ~~(Math.random() * 100)
      const number2 = ~~(Math.random() * 100)
      client.publish('line1', 'hello ' + number1)
      client.publish('line2', 'world ' + number2)
      const trueOrFalse = ~~(Math.random() * 2)
      client.publish('backlight', trueOrFalse ? 'on': 'off')
      }, 2000)
  }
})