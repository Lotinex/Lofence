const socketio = require('socket.io')
const http = require('http')
const DBManager = require('../Tool/DBManager')
const Server = http.createServer()
const ws = socketio(Server)
const dice = (min, max) => {
    return Math.floor( Math.random() * (max - min + 1 ) ) + min;
}
ws.on('connection', socket => {
    //if(socket.handshake.address != '1.241.188.14') ws.to(socket.id).emit('exit')
    socket.on('chat', (nick, chat) => {
        ws.emit('displayNewChat', nick, chat)
    })
})

Server.listen(7010, () => {
    console.log('게임 서버가 열렸습니다.')
})
