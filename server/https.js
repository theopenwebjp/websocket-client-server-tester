const fs = require('fs')
const https = require('https')
const WebSocket = require('ws')
const settings = require('./settings.json')

const server = new https.createServer({
  cert: fs.readFileSync(settings.https.cert),
  key: fs.readFileSync(settings.https.key)
})
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
    ws.send('https server received message: ' + message)
  })

  ws.send('https connection ready')
})

server.listen(settings.https.port)
