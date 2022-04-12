const fs = require('fs')
const https = require('https')
const WebSocket = require('ws')
const settings = require('./settings.json')
const {
  MESSAGES, logSettings
} = require('./common.js')

const TYPE = 'https'
logSettings(settings, TYPE)

const server = new https.createServer({
  cert: fs.readFileSync(settings.https.cert),
  key: fs.readFileSync(settings.https.key)
})
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log(MESSAGES.RECEIVED_MESSAGE_LOG(message))
    ws.send(MESSAGES.RECEIVED_MESSAGE_HTTP(TYPE, message))
  })

  ws.send(MESSAGES.CONNECTION_READY)
})

server.listen(settings.https.port)
console.log(MESSAGES.LISTENING(settings.https.port))
