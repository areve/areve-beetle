// const mqtt = require('mqtt')
// const client = mqtt.connect('ws://localhost/mqtt')
// client.on('connect', () => {
//   client.subscribe('log')
// })
// client.on('message', (topic, message) => {
//   context = message.toString();
//   console.log(topic, context)
// })


var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){
  console.log('connect')
});
socket.on('log', function(data){
  console.log('log', data)
});
socket.on('disconnect', function(){
  console.log('disconnect')
});