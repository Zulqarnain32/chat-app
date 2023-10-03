const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const port = 5000;

app.use(express.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST']
    }
})

io.on('connection', (socket) => {
   console.log(`User connected : ${socket.id}`);

   socket.on('send-message', (message) => {
    console.log(message);
    io.emit('received-message', message)
   })

   socket.on('disconnect', () => {
    console.log(`User disconnected`);
   })
})



server.listen(port, () => {
   console.log("server is listening at port no 5000");
})