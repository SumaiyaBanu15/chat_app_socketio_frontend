import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';



function Chat() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currUser, setCurrUser] = useState(undefined);

  useEffect(()=>{
  async function userData(){
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
    else{
      setCurrUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }
   userData();
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    async function fetchData(){
      if(currUser){
        if(currUser.isAvatarImgSet){
          const  data = await axios.get(`
          ${allUsersRoute}/${currUser._id}`);
          setContacts(data.data);
        }
        else{
          navigate('/setAvatar');
        }
      }
    }
    fetchData();
    // eslint-disable-next-line
  },[currUser]);

  return <>
    <Container>
      <div className="container">
        <Contacts 
        contacts={contacts} 
        currUser={currUser}
        />
      </div>

    </Container>
  </>
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #131324;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-column: 25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px) {
    grid-template-column: 35% 65%;
  }

}
`;


export default Chat