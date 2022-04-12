# Description

Simple project for testing ability of browser client to communicate with server using web sockets.
The purpose of this project is for testing if the client supports Web Sockets and that the server has the network setup correctly for using web sockets.

## Setup

Client:

1. Install: `npm install`
2. Setup localhost: `npm run localhost`.
3. Open link at location shown in shell. Opens client page.

Server:

1. Place server directory on your server at desired location.
2. Enter uploaded server directory and execute `npm run install` and then `node http.js` for http or `node https.js` for https. Remember to change any applicable settings in settings.json.

## Usage

※ Server URL is localhost:[PORT] where the port is usually 80, 443 for http, https respectively.
Input server url and then click connect.  
Once connected, it is possible to send data and receive responses.

For https, make sure to set the certificate info in settings to your https config information.

## nginx config

nginx example config:
Make sure to change [IP AND PORT OF SERVER]

```nginx
# Outside of server
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

# Inside server
location /websocket {
    #proxy_set_header X-Real-IP  $remote_addr;
    #proxy_set_header X-Forwarded-For $remote_addr;
    #proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_pass http://[IP AND PORT OF SERVER];
}
```

## Considerations

This project only uses Node.js for the server.
The reason for this is a web socket requires setting up a process that listens for incoming messages so a shared server that usually only supports PHP would probably be difficult to setup making Node.js just as easy to setup as anything else.
Please setup your own web socket server code if using another environment. For example in PHP: [http://socketo.me](socketo.me)

Server is separate package, but SHOULD NOT be package controlled, so uses "private = true".
