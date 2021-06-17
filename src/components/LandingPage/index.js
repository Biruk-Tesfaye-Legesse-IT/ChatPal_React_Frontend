import React, {useState,useEffect} from 'react';
import './Landing.css';
import {GoogleLogin} from "react-google-login";
import {GoogleLogout} from 'react-google-login';
import {useHistory} from 'react-router-dom';




// import LoginGithub from 'react-login-github';
// import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';




//Github 

// const onSuccess = response => console.log(response);
// const onFailure = response => console.error(response);


const responseFacebook = (response) => {
    console.log(response);
  }

var logout=()=>{
    console.log("Logged out succesfully");
};


export default function Landing(props) {
    let history = useHistory();
    sessionStorage.removeItem("chatting_with_username")
    var responseGoogle= async(response)=>{   
      sessionStorage.setItem("tokenId", response.tokenId)
      sessionStorage.setItem("my_id", response.googleId)
        
        console.log(response);
          let res = await fetch(`http://127.0.0.1:5000/api/authorize/${response.tokenId}`);
          let data = await res.json()
          console.log("inside the if");
          if (data != 401){
            
            history.push('/chat');
           }
        
        


        // joining private room in socket
        props.socket.emit("join",{"username":response.profileObj.givenName, "room":response.googleId})
        

        sessionStorage.setItem("chatting_with", "")
        sessionStorage.setItem("chatting_with_username", "")
    };
    

    // const [initialData, setInitialData] = useState([{}])
    // useEffect(()=> {
    //     fetch('/api').then(
    //         response => response.json()
    //      ).then(data => setInitialData(data))
    //  //    ).then(data => console.log(data))
    // },[]);


    return (
      <div> 
        <div className="App">
        
        {/* <h1>{initialData.title}</h1> */}

        

        <header id='header'>
              <div className='intro'>
                <div className='overlay'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-8 col-md-offset-2 intro-text'>
                        <h1>
                          Welcome to ChatPal
                          <span></span>
                        </h1>
                        <p>Instant reach to all you can imagine!</p>
                        {/* <a
                          className='btn btn-custom btn-lg page-scroll'
                        >


                          



                        </a>{' '} */}

                        <GoogleLogin className="btn btn-custom btn-lg page-scroll"
                            clientId="709342652468-q70g39ndsui4iuclht5eeatfhl9nqngn.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            >Continue with Google</GoogleLogin>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
       

        {/* <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={logout}

        />
          */}

        {/* <LoginGithub 
        clientId="b860a1e2fed2d9e47918"
        onSuccess={onSuccess}
        onFailure={onFailure}/> */}

        {/* <FacebookLogin
            appId="536039370890034"
            // autoLoad={true}
            // fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook} /> */}

        {/* <Navigation /> */}

        {/* <Header /> */}

</div>
      </div>
    );
}