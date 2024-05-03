// const socket = io('https://pauloborgesgh.github.io'); // Substitua localhost pelo IP do seu servidor

// const messagesContainer = document.getElementById('messages');
// const inputMsg = document.getElementById('input-msg');
// const sendBtn = document.getElementById('send-btn');


// function addMessage(message) {
//     const div = document.createElement('div');
//     div.textContent = message;
//     messagesContainer.appendChild(div);
// }

// s
// sendBtn.addEventListener('click', () => {
//     const message = inputMsg.value;
//     if (message.trim() !== '') {
//         socket.emit('chatMessage', message);
//         inputMsg.value = '';
//         addMessage('Você: ' + message); 
//     }
// });

// inputMsg.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         sendBtn.click();
//     }
// });


// socket.on('message', (message) => {
//     addMessage('Outro Usuário: ' + message);
// });
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Evento de conexão
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Evento de recebimento de mensagem
    socket.on('chatMessage', (message) => {
        console.log('Mensagem recebida:', message);
        // Emitir a mensagem para todos os clientes conectados
        io.emit('message', message);
    });

    // Evento de desconexão
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket rodando na porta ${PORT}`);
});

