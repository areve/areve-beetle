const path = require('path')
const http = require('http')
const express = require('express')
const mosca = require('mosca')

const indexHtml = path.join(__dirname, 'index.html')
const browserMqttJs = path.join(__dirname, 'browserMqtt.js')

const app = express()
  .get(/mqtt/, (req, res) => res.sendFile(browserMqttJs))
  .get(/.*/, (req, res) => res.sendFile(indexHtml))

const server = http.createServer(app)
const mqttServer = new mosca.Server({})
mqttServer.attachHttpServer(server)
server.listen(process.env.PORT || 80)
