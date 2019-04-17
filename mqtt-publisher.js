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
      const number1 = ~~(Math.random() * 10)
      const number2 = ~~(Math.random() * 10)
      client.publish('line1', 'hello ' + ("+".repeat(number1)))
      client.publish('line2', 'world ' + ("+".repeat(number2)))
    }, 2000)

    setInterval(() => {
      const trueOrFalse = (~~(Math.random() * 10)) > 0
      client.publish('backlight', trueOrFalse ? 'on': 'off')
    }, 725)
  }
})