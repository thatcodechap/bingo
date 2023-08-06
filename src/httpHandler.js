import sessionHandler from "./sessionHandler.js";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const MAX_PLAYERS = 3;

export default function httpHandler(req,res){
    if(req.path == '/play')
        newGame(req,res);
    else if(req.path.substring(1) in sessionHandler.getAll())
        joinGame(req,res);
    else if(req.path == '/error')
        res.sendFile(path.join(__dirname, 'client/error.html'));
    else
        res.redirect('/');
}

function newGame(req,res){
    let newSession = sessionHandler.new();
    res.redirect(newSession.id);
}

function joinGame(req,res){
    let sessionId = req.path.substring(1);
    let session = sessionHandler.find(sessionId);
    if(session.status == 'ingame')
        res.redirect('/error?message=Game%20already%20started')
    else if(session.playerCount == MAX_PLAYERS)
        res.redirect('/error?message=Max%20player%20limit%20reached');
    else if(session.status == 'ended'){
        session.reset();
        res.redirect(req.path);
    }
    else
        res.sendFile(path.join(__dirname, 'client/game.html'));
}