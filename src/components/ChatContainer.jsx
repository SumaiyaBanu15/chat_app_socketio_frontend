import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currChat, currUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMsg, setArrivalMsg] = useState(null);

  useEffect(() => {
    async function fetchRes(){
      if(currChat) {
        try{
      const response = await axios.post(getAllMessageRoute, {
        from: currUser._id,
        to: currChat._id,
      });
      if(Array.isArray(response.data)){
      setMessages(response.data);
      }
      else{
        console.error("Error is :", response.data);
      }
    }
    catch(error){
      console.error("Error is: ", error);
    }
    }
  }
   fetchRes();
   
  }, [currChat, currUser]);

  const handleSendMsg = async (msg) => {
    try{
    await axios.post(sendMessageRoute, {
      from: currUser._id,
      to: currChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currChat._id,
      from: currUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf:true, message: msg });
    setMessages(msgs);
    }
    catch(error){
      console.error("Error is: ", error);
    }
  }

   useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive", (msg) => {
      // console.log({msg});
       setArrivalMsg({ fromSelf: false, message: msg })
      })
    }
  
   }, [socket]);

   useEffect(()=>{
   if(arrivalMsg)
     {
      setMessages((prev) => [...prev, arrivalMsg]);
     }
   }, [arrivalMsg]);

   useEffect(()=>{
     scrollRef.current?.scrollIntoView({ behaviour: "smooth"});
   },[messages]);

return <>
  {
    currChat && (
  <Container>
    <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
            <img
                src={`data:image/svg+xml;base64,${currChat.avatarImage} `}
                alt="Avatar"
              />
            </div>
            <div className="username">
                <h3>{currChat.username}</h3>
            </div>
        </div>
        <Logout />
    </div>
    <div className="chat-messages">
      {
        messages.map((message) => {
 return (
  <div ref={scrollRef} key={uuidv4()}>
    <div className= {`message ${ message.fromSelf ? "sended" : "received"}`} >
      <div className="content">
        <p>
          {message.message}
        </p>
      </div>
    </div>
    </div>
 );
        })
      }
    </div>
    <ChatInput handleSendMsg = { handleSendMsg }/>
  </Container>
    )
}

  </>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-rows: 15% 70% 15%;
  }

.chat-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
    .user-details{
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar{
        img{
          height: 3rem;
        }
      }
      .username{
        h3{
          color: white;
        }
      }
    }
  }
  .chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

  .message{
    display: flex;
    align-items: center;

    .content{
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;

      @media screen and (min-width: 720px) and (max-width: 1080px){
        max-width: 70%;
      }
    }
  }
  .sended{
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .received{
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }    
}

`;
export default ChatContainer