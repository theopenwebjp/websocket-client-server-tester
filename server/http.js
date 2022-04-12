const WebSocket = require('ws')
const settings = require('./settings.json')
const {
  MESSAGES, logSettings
} = require('./common.js')

const TYPE = 'http'
logSettings(settings, TYPE)

const wss = new WebSocket.Server({ port: settings.http.port })
console.log(MESSAGES.LISTENING(settings.http.port))

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log(MESSAGES.RECEIVED_MESSAGE_LOG(message))
    ws.send(MESSAGES.RECEIVED_MESSAGE_HTTP(TYPE, message))
  })

  ws.send(MESSAGES.CONNECTION_READY)
})
