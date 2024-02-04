import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket, uname, roomId}) {

    const [currmsg,setCurrMsg] = useState("");
    const [msgList,setMsgList] = useState([]);
    const sendMessage = async () => {
        if(currmsg !== ""){
            const messageData = {
                roomId : roomId,
                author : uname,
                message : currmsg,
                time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() ,
            };
            await socket.emit("send_message",messageData);
            setMsgList((list) => [...list, messageData]);
            setCurrMsg("");
        }
    };

    useEffect(() => {
        const handleReceiveMessage = (data) => {
          setMsgList((list) => [...list, data]);
        };
      
        // Add the event listener
        socket.on("receive_message", handleReceiveMessage);
      
        // Clean up the event listener when the component is unmounted
        return () => {
          socket.off("receive_message", handleReceiveMessage);
        };
      }, [socket]);
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
            </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {
                msgList.map((messageContent)=>{
                    return (
                        <div className='message' id={uname === messageContent.author ? "you" : "other"}>
                            <div>
                            <div className='message-content'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='message-meta'>
                            <p id='time'>{messageContent.time}</p>
                            <p id='author'>{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                    );
                })
            }
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='Hey...' value={currmsg} onChange={(e) =>   
                    {
                    setCurrMsg(e.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter"  && sendMessage();
                    }}
                     />
            <button onClick={sendMessage}>&#9658;</button>
            </div>
            
        
    </div>
  )
}

export default Chat