const socket = io("http://localhost:8000");

const form = document.getElementById('sendcontainer');
const messageinput= document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('tone.mp3');
const append = (message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position =='left'){
    audio.play();
    }
}

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message =messageinput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageinp.value=""
})
const namee = prompt("Enter your name to join");
socket.emit('new-user-joined',namee);

socket.on('user-joined' , data=>{
    append(`${data} joined the chat`, 'right');
})
socket.on('receive' , data=>{
    append(`${data.name}:${data.message}`, 'left');
})

socket.on('left' , data=>{
    append(`${data} left the chat`, 'left');
})
