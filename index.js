const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Message = require("./models/Message")

const { dbConnection } = require("./database/config")

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

dbConnection();

app.use(cors())

app.use(bodyParser.json());

const room = 1;

io.on("Connection", (socket) => {

    socket.join(room);

    socket.on('msg_to_room', async function (msg) {
        const message = new Message(msg);
        await message.save();
        socket.to(room).emit('message', msg);
    })

    socket.on("disconnect", () => {
        console.log("cliente desconectado")
    })
});

http.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto", process.env.PORT);
});
