// const mqtt = require('mqtt')
// const client = mqtt.connect('ws://localhost/mqtt')
// client.on('connect', () => {
//   setInterval(() => {
//     const message = new Date().toISOString()
//     client.publish('log', message)
//     console.log('sent', message)
//     }, 1000)
// })


var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){
  setInterval(() => {
    const message = new Date().toISOString()
    socket.emit('log', message)
    console.log('sent', message)
  }, 1000)
});
socket.on('event', function(data){
  console.log('event', data)
});
socket.on('disconnect', function(){
  console.log('disconnect')
});