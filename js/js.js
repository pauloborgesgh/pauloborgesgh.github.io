const socket = io('https://pauloborgesgh.github.io'); // Substitua localhost pelo IP do seu servidor

const messagesContainer = document.getElementById('messages');
const inputMsg = document.getElementById('input-msg');
const sendBtn = document.getElementById('send-btn');


function addMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    messagesContainer.appendChild(div);
}

s
sendBtn.addEventListener('click', () => {
    const message = inputMsg.value;
    if (message.trim() !== '') {
        socket.emit('chatMessage', message);
        inputMsg.value = '';
        addMessage('Você: ' + message); 
    }
});

inputMsg.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});


socket.on('message', (message) => {
    addMessage('Outro Usuário: ' + message);
});
