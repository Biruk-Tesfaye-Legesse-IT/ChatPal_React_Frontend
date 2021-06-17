import React, { useRef, useEffect, useCallback, useState } from 'react';
import {GoogleLogout} from 'react-google-login'
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import {AiFillCamera} from 'react-icons/ai'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useHistory } from 'react-router';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 400px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

// grid-template-columns: 1fr 1fr;
// display: grid;
  

const ModalImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px 10px 10px 10px;
  background: #000;
  margin-left: 9rem;
  margin-top: 4rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  color: #141414;

  p {
    
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #067cff;
    color: #fff;
    border-radius: 10%;

  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


const LogoutButton = styled.button`
  border-radius: 0% !important;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  background: #fff;
  z-index: 10;
`;

const EditButton = styled.button`
  margin-bottom: 2rem;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  z-index: 10;
`;

const UpdateButton = styled.button`
  margin-bottom: 2rem;
  cursor: pointer;
  position: relative;
  z-index: 10;
`;


const CameraButton = styled(AiFillCamera)`
  color:#067cff;
  margin-top: 8rem;
  
  cursor: pointer;
  position: absolute;
  z-index: 10;
  size: 30px;
`;


const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  line-height: 0.5;
  color: #141414;
  margin-bottom: 2rem;

  p {
    
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #067cff;
    color: #fff;
    border-radius: 10%;

  }

`;

const Input = styled.input`
  outline: none;
  border:none;
  border-radius: 3px;
 
  }
`;



export default function SettingsModal ({ showModal, setShowModal }) {
  console.log("Modal")
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const ButtonTest = () => { console.log("Button Works")
    };

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  //===============================================================
  

  const fileInputRef = useRef();
  const [preview, setPreview] = useState();
  const[image,setImage] = useState();



  // useEffect(()=>{
  //   if(image){
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
        
  //     }
  //     reader.readAsDataURL(image);
  //     console.log(preview);
  //   }
  //   else{
  //     setPreview(null)
  //   }
  // },[image])
  
  

  // ===========================================================================

  
    const [userName, setUsername] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

    useEffect(() => {
      fetch(`http://127.0.0.1:5000/api/users/${sessionStorage.getItem("my_id")}`)
      .then(response => response.json())
      .then(user =>{
        setImage(user["profile_picture"])
        setFirstname(user["username"])
      })
    },[])
  
    const logName = () => {
      console.log(userName);
      console.log(firstName);
      console.log(lastName);
    };
  
    const handleUserNameInput = e => {
      setUsername(e.target.value);
    };
    const handleFirstNameInput = e => {
      setFirstname(e.target.value);
    };
    const handleLastNameInput = e => {
      setLastname(e.target.value);
    };
    let history = useHistory();

    const logout = () => {
      sessionStorage.removeItem("tokenId")
      history.push("./")
    }

    const updateUsername = () => {
      fetch(`http://localhost:5000/api/users/${sessionStorage.getItem('my_id')}`, {
                  method: 'PUT',
                  mode:"cors",
                  headers: {
                              'tokenId': sessionStorage.getItem('tokenId'),
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                  body: JSON.stringify({
                    "username": userName
                  })
              }).then(setFirstname(userName))
              .then(setUsername("") )
    }



  // =============================================================================

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>

          <animated.div style={animation}>

            <ModalWrapper showModal={showModal}>

              {/* <ModalImg src={require('./modal.jpg').default} alt='camera'/> */}
              {/* <ModalImg src={preview ? preview  : require('./modal.jpg').default} alt='camera'/> */}

              <ModalImg src={preview ? preview : image}/>

              
             
              <CameraButton size={30} onClick={(event)=>{
                    event.preventDefault();
                    fileInputRef.current.click();

              }}/>

             

              <input type="file" style={{ display: "none" }} 
              
              ref={fileInputRef}  
              accept="image/+"
              onChange={(event)=>{

                
                
                
            

                const fileform = new FormData()
                const file = event.target.files[0];

                const reader = new FileReader();
                reader.onloadend = () => {
                  console.log("sdjnj");
                  setPreview(URL.createObjectURL(file));
                  
                  
                }

                fileform.append('file', file)
              if (file) {
                setImage(URL.createObjectURL(file))
                console.log(file);
                fetch(`http://localhost:5000/api/users/${sessionStorage.getItem('my_id')}`, {
                  method: 'PUT',
                  body: fileform,
                  headers: {
                              'tokenId': sessionStorage.getItem('tokenId'),
                            }
              }).then(console.log(file))
              } else {
                 setImage(null);
              }
              
              
              
              
              }}/>

              <ModalContent>

                

                <h1>{firstName}</h1>

           

                {/* <p>{preview}</p> */}

                

                <EditForm >
                  
                <Input className="form-group"
                  type="text"

                  onChange={handleUserNameInput}
                  value={userName}
                  placeholder="Username"/>

                

                </EditForm>

                <EditButton onClick={updateUsername} >Save Changes</ EditButton> 

                
                

                <GoogleLogout
                clientId="709342652468-q70g39ndsui4iuclht5eeatfhl9nqngn.apps.googleusercontent.com"
                  className="btn btn-block"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                />
               
                {/* < LogoutButton className="btn btn-block">Logout</ LogoutButton>  */}

                {/* <button className = "logt">Log Out</button> */}



              </ModalContent>



              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />

            </ModalWrapper>

          </animated.div>

        </Background>

      ) : null}
    </>
  );
};
