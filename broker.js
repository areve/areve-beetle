const path = require("path");
const http = require("http");
const express = require("express");
const mosca = require("mosca");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json({ type: "application/json" });
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
  .get(/^\/mqtt$/, (req, res) => res.sendFile(browserMqttJs))
  .get(/^.*$/, (req, res) => res.sendFile(indexHtml));

const server = http.createServer(app);
const mqttServer = new mosca.Server({});
mqttServer.attachHttpServer(server);
server.listen(process.env.PORT || 80);
