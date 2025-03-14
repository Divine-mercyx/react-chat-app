const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
dotenv.config({ path: "./backend/.env" });
const { Server } = require('socket.io');
const Chat = require("./models/Chat");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log("A user connected", socket.id);

    socket.on('sendMessage', async (data) => {
        const { sender, receiver, message } = data;
        const chatMessage = new Chat({ sender, receiver, message });
        await chatMessage.save();

        io.to(receiver).emit('receiveMessage', data);
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
})



app.use(express.json());
connectDB();

app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'))

app.listen(5000,
    () => console.log('Server running on port 5000.')
);