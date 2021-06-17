import React, {useEffect} from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

    const { profile_picture, user_id, username } = props.data;

    return (
      <div className="conversation-list-item" onClick={props.onClick} data-id={user_id} data-username={username}>
        <img className="conversation-photo" src={profile_picture} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ username }</h1>
          {/* <p className="conversation-snippet">{ user_id }</p> */}
        </div>
      </div>
    );
}