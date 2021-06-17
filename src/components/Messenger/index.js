import React, {useState, useEffect, useCallback} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import styled from 'styled-components';
import {Redirect} from "react-router-dom"
import SettingsModal from '../SettingsModal';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


export default function Messenger({authorized, userID, socket, onClick, onClickSetting}) {
  console.log("Authorized:", authorized);
  console.log("UserID:", userID);
  const [chatWith, setChatwith] = useState('')
  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal(prev => !prev);
  };
  
    // if (!authorized){
      
    //   return <Redirect to="/"/>;
    // }
    const send = async(e) =>{
      
      if (e.keyCode === 13){

        
        let res = await fetch(`http://127.0.0.1:5000/api/messages/${sessionStorage.getItem('chatting_with')}`, {
          method:"POST",
          mode:'cors',
          headers: {
            "tokenId": sessionStorage.getItem("tokenId"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: e.target.value
          })
        })
        
        let msg_sent = await res.json()
        console.log(msg_sent);
        socket.emit('incoming-msg', {
          'msg':msg_sent,
          'username': "Me", 
          'room': sessionStorage.getItem('chatting_with'), 
          'sender_id':sessionStorage.getItem('my_id'), 
          'reciever_id':sessionStorage.getItem('chatting_with')
        });
        e.target.value = "";
      }

  
    }
    const changeWhoToChat = (e) => {
      sessionStorage.setItem("chatting_with", e.target.dataset.id)
      sessionStorage.setItem("chatting_with_username", e.target.dataset.username)
      setChatwith(sessionStorage.getItem('chatting_with'))
      console.log(e.target.dataset.id);
    }
    

    return (
      <div className="messenger">


        <div className="scrollable sidebar">
          <ConversationList onClick={changeWhoToChat} onClickSetting={onClickSetting} socket={socket}/>
        </div>

        <div className="scrollable content" id="message_list">
          <MessageList onKeyUp={send} chatting_with={chatWith} socket={socket} />

        </div>

      
       




      </div>
    );
}