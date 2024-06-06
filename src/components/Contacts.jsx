import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logos.png';

function Contacts( {contacts, currUser}) {
  const [currUserName, setCurrUserName] = useState(undefined);
  const [currUserImg, setCurrUserImg] = useState(undefined);
  const [currSelected, setCurrSelected] = useState( undefined);

   useEffect(()=>{
    if(currUser){
      setCurrUserImg(currUser.avatarImage);
      setCurrUserName(currUser.username);
    }
  },[currUser]);

  const changeCurrentChat = (index, contact) => {
    return <>
    {
    currUserImg && currUserName && (
      <Container>
        <div className="brand">
          <img src={logo} alt="logo" />
          <h3>Chat Time</h3>
        </div>
        <div className="contacts">
          {
            contacts.map((contact,index)=>{
              return (
                <div className={`contact ${index === currSelected ? "selected" : ""}`} key={index}>
                  <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage} `} alt='Avatar'/>
                  </div>
                   <div className="username">
                    <h3>{contact.username}</h3>
                   </div>
                </div>
              )
            })
          }
        </div>

        <div className="curr-user">
          <div className="avatar">
          <img src={`data:image/svg+xml;base64,${currUserImg} `} alt='Avatar'/>
                  </div>
                   <div className="username">
                    <h2>{currUserName}</h2>
                   </div>
          </div>

      </Container>
    )

  }
    </>
  }
  return (
    <div>Contacts</div>
  )
}

const Container = styled.div`
 display: grid;
 grid-template-column: 10% 75% 15%;
 overflow: hidden;
 background-color: #080420;
 .brand{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  img{
    height: 2rem;
  }
  h3{
    color: white;
    text-transform: uppercase;
   }
 }
 .contacts{
  display: flex;
  flex-direction: column;
  align-items: center;
  over-flow: auto;
  gap: 0.8rem;
  .contact{
    background-color: #ffffff39;
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.4rem;
    gap: 1rem;
    align-items: center;
    display: flex;
    transition: 0.5s ease-in-out;
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
  .selected{
    background-color: #9186f3;
  }
 }
 .curr-user{
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar{
    img{
      height: 4rem;
      max-inline-size: 100%;
    }
  }
  .username{
    h2{
      color: white;
    }
  }
 }
`;
export default Contacts