import React, {useState, useEffect, useCallback} from 'react';
// import ConversationList from '../ConversationList';
// import MessageList from '../MessageList';
// import MessageList from '../MessageList';
import './Chat.css';
import styled from 'styled-components';
import {Redirect} from "react-router-dom"
import SettingsModal from '../SettingsModal' ;
import Messenger from '../Messenger';
import Modal from 'react-modal'


// const Try = styled.div`
//   z-index=5;
// `;


export default function Chat({authorized, userID, socket}) {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(prev => !prev);
    };




  console.log("Authorized:", authorized);
  console.log("UserID:", userID);
    // if (!authorized){
      
    //   return <Redirect to="/"/>;
    // }

    

 
    return (
        
      <main>

       


       
           
{showModal ? (
               <SettingsModal showModal={showModal} setShowModal={setShowModal}/>
              
              ) : (
                <Messenger onClickSetting={openModal} socket={socket}/>
              )}
      
    
      
     

      
        
       

       
        
       

       

     
          
      

      </main>
    );
}