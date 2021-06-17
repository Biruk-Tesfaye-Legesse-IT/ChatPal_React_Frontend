import React, {useState, useEffect, useCallback} from 'react';


import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
// import Messenger from './components/Messenger';
import Chat from './components/Chat';
import Landing from './components/LandingPage'
import SettingsModal from './components/SettingsModal';
import io from 'socket.io-client'


function App() {
    const socket = io.connect('http://127.0.0.1:5000/')
    const [showModal, setShowModal] = useState(true);

    const openModal = () => {
      setShowModal(prev => !prev);
    };

    return (


    

        <Router>
            <Switch>
                <Route exact
                 path="/" 
                 component={() => <Landing socket={socket} />}/>
                <Route 
                    exact 
                    path="/chat" 

                    component={() => <Chat userID={true} authorized={true}  socket={socket}/>}
                    />
                
            </Switch>
        </Router>

        
    );  
}

export default App;