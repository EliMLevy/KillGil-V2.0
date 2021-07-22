const express = require('express')

const app = express()

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log('server is listening on port ' + port)
})

const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))

const players = []

io.on('connection', (socket) => {
  console.log('a user connected')
  // Send a list of current players to the new player
  io.to(socket.id).emit('all-players', { players: players })
  players.push(socket.id)

  // Send the new player to all the current players
  socket.broadcast.emit('new-player', { id: socket.id })

  socket.on('movement', (data) => {
    data.id = socket.id
    socket.broadcast.emit('movement', data)
  })

  socket.on('shot-fired', (data) => {
    data.id = socket.id
    socket.broadcast.emit('shot-fired', data)
  })
  socket.on('shot-landed', (data) => {
    data.id = socket.id
    socket.broadcast.emit('shot-landed', data)
  })

  socket.on('death', (data) => {
    data.id = socket.id
    socket.broadcast.emit('death', data)
    io.emit('new-kill', data)
    // io.to(data.shooter).emit("new-kill");
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    players.splice(players.indexOf(socket.id), 1)
    socket.broadcast.emit('player-left', { id: socket.id })
  })
})

app.get('/', (req, res) => {
  console.log('Connection')
})
