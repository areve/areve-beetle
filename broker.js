const http = require('http')
const mosca = require('mosca')

const httpServ = http.createServer()
const mqttServ = new mosca.Server({})
mqttServ.attachHttpServer(httpServ)
httpServ.listen(process.env.PORT || 80)