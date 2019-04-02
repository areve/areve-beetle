const mosca = require('mosca')
const settings = {
  port:  process.env.PORT || 1883
}

const server = new mosca.Server(settings)
server.on('ready', () => {
  console.log("ready")
})