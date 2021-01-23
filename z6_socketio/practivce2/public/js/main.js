const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name'); //hiển thị tên phòng  cho lên broadcast
const userList = document.getElementById('users'); //hiển thị tên phòng  tên user cho lên broadcast

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom. Cái này dùng để chat riêng với nhóm
socket.emit('joinRoom', { username, room });

// Get room and users. Lấy và hiển thị tên phòng và tên user cho lên broadcast
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

/* 
Message from server. 
Cái này là nghe tất cả các sự kiện ở bên server:  
Welcome current user, Broadcast when a user connects, Runs when client disconnects, lắng nghe cả sự kiện chat với nhau
 */
socket.on('message', message => {
  console.log(message);
  outputMessage(message);//  Hiển thị màn hình chát

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;// Tạo ra thanh cuộn
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }

  // Emit message to server. Để server gửi đến cho những người khác
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
