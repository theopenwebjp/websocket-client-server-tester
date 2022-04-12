window.addEventListener('load', onLoad)

const state = {
  /**
   * @type {WebSocket|null}
   */
  connection: null
}

function onLoad () {
  el('#connect').addEventListener('click', connect)
  el('#send').addEventListener('click', send)
}

/**
 * @param {string} message 
 */
function output (message) {
  const row = document.createElement('div')
  row.textContent = message
  el('#response').appendChild(row)
}

function connect () {
  // Disconnect old if exists
  disconnect()

  const protocol = el('#protocol').options[el('#protocol').selectedIndex].value
  const url = el('#url').value
  const webSocketUrl = `${protocol}://${url}`
  try {
    state.connection = new window.WebSocket(webSocketUrl)
    setupConnectionObject(state.connection)
  } catch (err) {
    output(`Failed to setup connection: ${err.message}`)
  }
}

function disconnect () {
  if (state.connection) {
    console.log('disconnecting')
    state.connection.close()
    state.connection = null
  }
}

function send () {
  const data = el('#data').value
  if (state.connection) {
    state.connection.send(data)
  }
}

/**
 * @param {string} url 
 */
function updateConnectedTo (url) {
  el('#connected-to').value = url
}

/**
 * @param {WebSocket} connection 
 */
function setupConnectionObject (connection) {
  connection.onmessage = (event) => {
    output(`onmessage: ${event.data}`)
  }

  connection.onerror = (event) => {
    output(`onerror: ${event.data}`)
  }

  connection.onopen = (event) => {
    output(`onopen`)
    updateConnectedTo(connection.url)
  }

  connection.onclose = (event) => {
    output(`onclose`)
    if (state.connection === connection) {
      updateConnectedTo('')
    }
  }
}

/**
 * @param {string} selector
 */
function el (selector) {
  return document.querySelector(selector)
}
