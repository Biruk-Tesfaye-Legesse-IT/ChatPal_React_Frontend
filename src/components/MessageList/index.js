import React, {useEffect, useState, useCallback} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import './MessageList.css';


export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const [msgAlert, setMsgAlert] = useState(1)
  const [MessagesEnd, setMessagesEnd] = useState()

  var tempMessages = []
  
  const getMessages = useCallback(async() => {
    tempMessages = []

    let res = await fetch(`http://127.0.0.1:5000/api/messages/${props.chatting_with}`,{
      method: 'GET',
      headers: {
        "tokenId": sessionStorage.getItem("tokenId")
      }
    })

    let msgs = await res.json()
      tempMessages = msgs
      
      setMessages([messages, ...tempMessages])
      MessagesEnd.scrollIntoView()
     
 }, [props.chatting_with])

 const getUpdate = useCallback((data) => {
    const msg = data["msg"];
    const condition1 = sessionStorage.getItem("chatting_with")== msg["sender_id"]
    const condition2 = (msg["sender_id"] == sessionStorage.getItem("my_id"))
    if (condition1 || condition2){
      console.log("inside conditions");
      setMessages(messages => [...messages, msg]);
      document.querySelector("#end").scrollIntoView({behavior:"smooth"})
    }else{
      console.log("New message......");
    }
    
},[msgAlert])

  useEffect(() => {
    getMessages();
  },[props.chatting_with])
  useEffect(() => {
    props.socket.on('message', (data) => {
        
        setMsgAlert(msgAlert+1)
        getUpdate(data);
    })
  },[])

  
  
  const renderMessages = useCallback(() => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.sender_id === sessionStorage.getItem('my_id');
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.sender_id === current.sender_id;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }
      
      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }
    
    return tempMessages;
  }, [props.chatting_with, messages, msgAlert])



    return(
      <div className="message-list">
        <Toolbar
          title={sessionStorage.getItem('chatting_with_username')}
          rightItems={[
          ]}
        />

        <div className="message-list-container">{renderMessages()}</div>
        <div style={{ float:"left", clear: "both" }}
              id={"end"}
             ref={(el) => { setMessagesEnd(el) } }>
        </div>
        

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]} onKeyUp={props.onKeyUp}/>
      </div>
    );
}