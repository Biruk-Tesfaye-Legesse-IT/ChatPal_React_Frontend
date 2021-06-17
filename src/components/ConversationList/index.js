import React, {useState, useEffect, useCallback} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import Modal from '../SettingsModal';
import './ConversationList.css';


export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [msgAlert, setMsgAlert] = useState(1)
  const getConversations = () => {
    const userslist = []
    
      fetch('http://127.0.0.1:5000/api/chatted_with',{
        method: 'GET',
        headers: {
          "tokenId": sessionStorage.getItem("tokenId"),
          "user_id": sessionStorage.getItem("my_id")
        }
      })
      .then(response => response.json())
      .then(users =>{
        users.forEach(user_id => {
          fetch(`http://127.0.0.1:5000/api/users/${user_id}`)
          .then(response => response.json())
          .then(user =>{
            userslist.push(user)
            setConversations([conversations, ...userslist])
          })
          
        });
        
    });

    
  }

  const searchUsers = (e) => {
    const userslist = []
    if (e.target.value == ''){
      getConversations()
    }else{
    fetch(`http://127.0.0.1:5000/api/search_users/${e.target.value}`,{
      method: 'GET',
      headers: {
        "user_id": sessionStorage.getItem("my_id")
      }
    }).then(response => response.json())
    .then(users => {
      if(users.length < 1){
        setConversations([conversations, ...userslist])
      }
      users.forEach(user => {
        userslist.push(user)
        
        setConversations([conversations, ...userslist])
      });
    })}
  }

  useEffect(() => {
    getConversations()
  },[])


  const getUpdate = useCallback((data) => {
    const msg = data["msg"];
    const condition1 = sessionStorage.getItem("chatting_with")== msg["sender_id"]
    const condition2 = (msg["sender_id"] == sessionStorage.getItem("my_id"))
    if (condition1 || condition2){
      console.log("inside conditions");
      // setMessages(messages => [...messages, msg]);
      
    }else{
      getConversations()
    }
    
},[msgAlert])


  useEffect(() => {
    props.socket.on('message', (data) => {
        setMsgAlert(msgAlert+1)
        getUpdate(data);
    })
  },[])


    return (
      <div className="conversation-list">
        <Toolbar
          title={<i class="fas fa-comments"><i id="app_title">ChatPal</i></i>}
          // leftItems={[
          //   <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          // ]}
          rightItems={[
          
            <ToolbarButton onClick = {props.onClickSetting} key="cog" icon="ion-ios-cog" /> 
            
          ]}
        />
        <ConversationSearch onKeyUp={searchUsers}/>
        
        {
          conversations.map(conversation =>
            conversation.username && 
            <ConversationListItem
              key={conversation.user_id}
              data={conversation}
              onClick={props.onClick}
            />
          )
             }

    
      </div>
    );
}











// export default function ConversationList(props) {
//   const [conversations, setConversations] = useState([]);

//   const getConversations = useCallback(() => {
//     axios.get('https://randomuser.me/api/?results=20').then(response => {
     
//         let newConversations = response.data.results.map(result => { 
//           return {
//             photo: result.picture.large,
//             name: `${result.name.first} ${result.name.last}`,
//             text: 'Hello world! This is a long message that needs to be truncated.'
//           };
//         });
//         setConversations([...conversations, ...newConversations])
//     });
//   },[conversations])

//   useEffect(() => {
//     getConversations()
//   },[])

 

//     return (
//       <div className="conversation-list">
//         <Toolbar
//           title="Messenger"
//           // leftItems={[
//           //   <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
//           // ]}
//           rightItems={[
          
//             <ToolbarButton key="cog" icon="ion-ios-cog" />
//           ]}
//         />
//         <ConversationSearch />
//         {
//           conversations.map(conversation =>
//             <ConversationListItem
//               key={conversation.name}
//               data={conversation}
//             />
//           )
//         }
//       </div>
//     );
// }