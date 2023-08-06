import { WebSocketServer } from 'ws';
import {createServer} from 'http';
import express from 'express'

import httpHandler from './httpHandler.js';
import socketHandler from './socketHandler.js';

const PORT = 8080;
const app = express();
const server = createServer(app);

server.listen(PORT,()=>console.log("Web server up ✓"));
const wss = new WebSocketServer({server: server});
wss.on('listening',()=>console.log("WebSocket server up ✓"));
console.log("Game server starting at port 8080")

app.use(express.static('src/client/public'));
app.use(httpHandler);
wss.on('connection', socketHandler);