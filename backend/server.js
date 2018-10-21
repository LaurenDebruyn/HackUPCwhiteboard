const express = require('express');
const path = require('path');
var db = require('rethinkdb');

// initialise server
const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


const socketIO = require('socket.io');


// intialise database
var connection = null;
db.connect(
  {
    host: 'ec2-35-180-103-159.eu-west-3.compute.amazonaws.com',
    port: 28015,
    db: 'db'
  }, function(err, conn)
      {
        if (err) throw err;
        connection = conn;
})



function insertData(new_data, table) {
  ts = Date.now();
  db.table(table).insert(
    {
      timestamp: ts,
      data: new_data
    }
  ).run(connection, function(err, result) {
    if (err) throw err;
    // console.log(JSON.stringify(result, null, 2));
  });
}

// is called when new user arrives
const dataInitialisation = () => {
  return new Promise((resolve, reject) => {
    db.db('db').table('paths').orderBy("timestamp").run(connection, (err, cursor) => {
      result = cursor.toArray((err, result) => JSON.stringify(result.data));
      resolve(result);
    });
  });
};

  //   function(err, cursor) {
  //   if(err) next( err);
  //   cursor.toArray(function(err, result) {
  //     if(err)next(err);
  //     res = JSON.stringify(result);
  //   });
  //   // return JSON.stringify(tmp_response);
  // });
  // console.log("result");
  // return res;

function clearData() {
  db.db('db').table('paths').between(0, db.maxval, {leftBound: 'open'}).delete().run(connection,  function(err, result) {
    if (err) throw err;
  });
}

// function getRoomID(package) {
//   // TODO implementation
//   id = "";
//   return id;
// }

// socket communication
const io = socketIO(server);
io.set( 'origins', '*herokuapp.com*:*' );

groups = [];

// create a new whiteboard group
// function newGroup(groupID) {
//   const group = io.of('/' + groupID);
//   groups.push(group);
// }

io.on('connection', (client) => {
  console.log("initialisation");

  dataInitialisation().then((initData) => {
    client.emit('init', initData);
  });

  // client logs in for spefic room
  client.on('init', (roomID) => {
    socket.join(roomID, () => {
      io.to(roomID).emit('a new user has joined the room');
    })
  });
  client.on('update', (package) => {
    // receive a change
    console.log("received package");
    // update database with new change
    insertData(package, "paths");
    // send other clients in same group the new change
    // roomID = getRoomID(package);
    // client.broadcast.to(roomID).emit('update', package);
    client.broadcast.emit('update', package);
  });
  client.on('clear', (dummy) => {
    console.log(dummy);
    clearData();
    client.broadcast.emit('clear', dummy);
  });
  client.on('brainstorm', (bool) => {
    client.broadcast.emit('brainstorm', bool);
  })
});

// io.on('connection', function(socket) {
//   console.log('a user connected');
//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });
//   socket.on('coordinates', function(nb){
//     console.log('number: ' + nb);
//     // io.emit('input number', nb);
//   })
//   socket.on('input', function(msg){
//     console.log('message:' + msg);
//   })
// });
