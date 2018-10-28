const WebSocket = require('ws')
const settings = require('./settings.json')

const wss = new WebSocket.Server({ port: settings.http.port })

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
    ws.send('http server received message: ' + message)
  })

  ws.send('http connection ready')
})
