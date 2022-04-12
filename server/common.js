/**
 * @typedef {{ http: HTTPSettings, https: HTTPSSettings }} Settings
 * @typedef {{ port: number }} CommonSettings
 * @typedef {CommonSettings & {}} HTTPSettings
 * @typedef {CommonSettings & { cert: string, key: string }} HTTPSSettings
 */

const MESSAGES = {
    CONNECTION_READY: 'https connection ready',
    /**
     * @param {string} type 
     * @param {string} message
     */
    RECEIVED_MESSAGE_HTTP: (type, message) => `${type} server received message: ${message}`,
    RECEIVED_MESSAGE_LOG: /** @param {String} message */ (message) => `received: ${message}`,
    LISTENING: /** @param {number} port */ (port) => `listening at: ${port}`
}

/**
 * @param {Settings} settings
 * @param {'http'|'https'} target
 */
function logSettings(settings, target) {
    if (target === 'http') {
        console.log('settings: ', {
            port: settings.http.port
        })
    } else if (target === 'https') {
        console.log('settings: ', {
            port: settings.https.port
        })
    }
}

module.exports = {
    MESSAGES,
    logSettings
}
