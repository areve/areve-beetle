const path = require("path");
const http = require("http");
const express = require("express");
const mosca = require("mosca");
const bodyParser = require("body-parser");
const socketIO = require('socket.io');

const jsonParser = bodyParser.json({ type: "application/json" });
const textParser = bodyParser.text({ type: "text/plain" });
const indexHtml = path.join(__dirname, "index.html");
const browserMqttJs = path.join(__dirname, "browserMqtt.js");

const store = {
  data: {
    backlight: "on",
    line1: "abcdefghijklmnop",
    line2: "1234567890123456"
  }
};
const app = express()
  .get(/^\/data$/, (req, res) => res.send(store.data))
  .get(/^\/data\/backlight$/, (req, res) => res.send(store.data.backlight))
  .get(/^\/data\/line1$/, (req, res) => res.send(store.data.line1))
  .get(/^\/data\/line2$/, (req, res) => res.send(store.data.line2))
  .post(/^\/data$/, jsonParser, (req, res) => {
    store.data = req.body;
    console.log(store.data);
    res.send(store.data);
  })
  .post(/^\/log$/, textParser, (req, res) => {
    mqttServer.publish({
      topic: 'log',
      payload: new Buffer(req.body),
      qos: 1 // this is important for offline messaging
    }, null, function done() {})
    res.send('ok');
  })
  .get(/^\/log$/, (req, res) => {
    mqttServer.publish({
      topic: 'log',
      payload: new Buffer(new Date().toISOString()),
      qos: 1 // this is important for offline messaging
    }, null, function done() {})
    res.send('ok');
  })
  .get(/^\/mqtt$/, (req, res) => res.sendFile(browserMqttJs))
  .get(/^.*$/, (req, res) => res.sendFile(indexHtml));

const server = http.createServer(app);
const mqttServer = new mosca.Server({});
mqttServer.attachHttpServer(server, '/mqtt');
mqttServer.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});
mqttServer.on('published', function(packet, client) {
  console.log('from', client.id, [packet.topic, packet.payload]);
});
mqttServer.on('ready', function(packet, client) {
  console.log('mqtt ready');
});

const io = socketIO(server)
io.on('connection', function (socket) {
  console.log('client connected', socket.id)
  const onevent = socket.onevent
  socket.onevent = (...args) => {
    console.log('from', socket.id, args[0].data)
    socket.broadcast.emit(...args[0].data)
    onevent.apply(socket, args)
  }
  socket.on('disconnect', () => {
    console.log('client disconnected', socket.id)
  })
})
console.log('socket.io ready')

server.listen(process.env.PORT || 80)

