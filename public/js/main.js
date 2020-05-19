const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// get username and room from URL
const { username,room} = Qs.parse(window.location.search,{
    ignoreQueryPrefix:true   //It ignores the ? & in query string 
})

// console.log(username ,room)

const socket = io()

// join chatroom
socket.emit('joinRoom', {username,room})

// Get room and users
socket.on('roomUsers',({ room,users})=>{
    outputRoomName(room)
    outputUsers(users)
})

// Message from server
socket.on('message', (data)=>{
    console.log(data)
    outputMessage(data)

    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    // get message text
    const msg = e.target.elements.msg.value
    // console.log(msg)

    // emit message to server
    socket.emit('chatMessage',msg)

    // clear input
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus()
})

// Output message to DOM
function outputMessage(data){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `	<p class="meta">${data.username} <span>${data.time}</span></p>
  <p class="text">
      ${data.text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div)
}

// Add Room name to DOM
function outputRoomName(room){
    roomName.innerText = room
}

// Add users to DOM
function outputUsers(users){
    userList.innerHTML = `
${users.map( user => `<li>${user.username}</li>`).join('')}
    
    `
}