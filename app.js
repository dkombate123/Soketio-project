const express = require("express");
const app = express();
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);
require("dotenv").config();


app.use(express.static(__dirname + "/public")); // on dit a express qu"on veut utiliser le dossier static "public" pour avoir accès a ses fichiers

app.get("/", function (req, res) {
    res.sendFile("index.html"); // ici il va le reconnaitre a cause de l'initilisation static
    
});

const users = [];

io.on("connection", function (socket) {
    console.log("utilisateur bien connecté");

    socket.on("dessin", function (data) { //emit = envoyer broadcast = envoyer aux autres client sauf nous
    socket.broadcast.emit("dessin", data);
        
    });
    socket.on("new user", function (name) { //emit = envoyer broadcast = envoyer aux autres client sauf nous
    users[socket.id]= name;
    socket.broadcast.emit("new user", name);
            
    });

    socket.on("new message", function (message) { 
    io.emit("new message", {author:users[socket.id], message:message});
                
    });
        
});

const port = process.env.PORT || 3000

server.listen(port, function (req, res) {
    console.log("Le serveur marche bien");
});
