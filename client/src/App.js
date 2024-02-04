import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {


  const [uname,setUname] = useState("");
  const [roomId,setRoomId] = useState("");
  const [showChat,setShowChat] = useState(false);

  const joinRoom = () => {
    if(uname!=="" && roomId!==""){
      socket.emit("join_room",roomId);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
     <div className='joinChatContainer'>
     <h3>Join A Chat</h3>
     <input type='text' placeholder='Name...' onChange={(e) =>
     {setUname(e.target.value);
    }}></input>
     <input type='text' placeholder='Room ID...' onChange={(e) => {
      setRoomId(e.target.value);
     }}></input>
     <button onClick={joinRoom}>Join A Room</button>
     </div>
     )
     :
     (
     <Chat socket={socket} uname={uname} roomId = {roomId}/>
     )
    }
     
    </div>
  );
}

export default App;
