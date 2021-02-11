import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3000');


function Hoba(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 5000);
  }


export {Hoba}